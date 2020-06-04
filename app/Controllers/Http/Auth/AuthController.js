"use strict";
const Database = use("Database");

const Transformer = use("App/Transformers/Auth/UserTransformer");
const User = use("App/Models/User");
const Role = use("Role");

const Token = use("App/Models/Token");
const Hash = use("Hash");

const Mail = use("Mail");

const Env = use("Env");

const { cpf } = require("cpf-cnpj-validator");

class AuthController {
  async register({ request, response, transform }) {
    // Criando uma transaction (Serve para cadastrar diversos elementos no DB e garantir que ou todos serão cadastrados ou nenhum)
    const trx = await Database.beginTransaction();
    try {
      const { email, password, person } = request.all();

      // Cria usuário
      let user = await User.create({ email, password }, trx);

      // Verifica se os dados da pessoa existe para ser registrado
      if (person) {
        // ===========================
        //  Validation for date birth
        // ===========================

        // Verifica através de regex o formato da data de nascimento
        let dateValid = person.date_birth.match(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$1/$2/$3"
        );
        if (dateValid === null) {
          throw {
            code: 1003,
            message: "Formato da data inválido. Formato ex.: dd/mm/yyyy"
          };
        }
        person.date_birth = person.date_birth
          .replace(/(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3")
          .split(/\//);

        person.date_birth = `${person.date_birth[1]}/${person.date_birth[0]}/${person.date_birth[2]}`;
        // Transform date_birth in timestamp
        person.date_birth = new Date(person.date_birth);
        // ====================
        //  Validation for cpf
        // ====================

        // Remove characters especiais
        person.cpf = person.cpf.replace(/[^0-9 ]/g, "");

        // Valida o cpf
        if (!cpf.isValid(person.cpf)) {
          throw {
            code: 1004,
            message: "CPF inválido"
          };
        }

        // Cria a pessoa vinculando as informações do usuário
        await user.person().create(person, trx);
      }

      const userRole = await Role.findBy("slug", "client");

      await user.roles().attach([userRole.id], null, trx);
      // Roda todos os valores da trx e garante a persistencia
      await trx.commit();

      user = await transform.item(user, Transformer);

      return response.status(201).send({
        user,
        message: "Usuário criado com sucesso!"
      });
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: "Erro ao realizar cadastro", error });
    }
  }
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    // Valida usuario e gera token
    let data = await auth.withRefreshToken().attempt(email, password);

    return response.send({ data, message: "Seja bem-vindo!" });
  }
  async refresh({ request, response, auth }) {
    let refresh_token = request.input("refresh_token");

    if (!refresh_token) {
      refresh_token = request.header("refresh_token");
    }
    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token);

    return response.send({ data: user });
  }
  async logout({ request, response, auth }) {
    let refresh_token = request.input("refresh_token");

    if (!refresh_token) {
      refresh_token = request.header("refresh_token");
    }

    await auth
      .authenticator("jwt")
      .revokeTokens([refresh_token], true /*Apagado o token */);

    return response.status(204).send({});
  }
  async forgot({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      let email = request.input("email");
      // Procura pelo email
      let user = await User.findBy("email", email);

      // Verifica se o email existe
      if (!user) {
        throw {
          code: 1100,
          message: "E-mail inválido"
        };
      }
      let userJson = user.toJSON();
      let personJson = (await user.person().fetch()).toJSON();

      // Pega o nome da pessoa
      let name = personJson.name.split(" ")[0];

      // Pega o id do usuário
      const user_id = userJson.id;
      // Typo do token
      const type = "reset_password";
      // Gera token a partir do id e do tipo de token
      const token = await Hash.make(`${user_id}-${type}`);
      // Diz que no token não foi revoked
      const is_revoked = false;

      // Cria o token
      let newToken = await Token.create(
        { user_id, token, type, is_revoked },
        trx
      );

      // Verifica se foi criado
      if (!newToken) {
        throw {
          code: 1101,
          message: "Erro ao gerar token"
        };
      }

      // Objeto com informações que estarão na mensagem do email
      let configMail = {
        name,
        url: `${Env.get("RESET_PASSWORD_URL", "localhost")}/${token}`,
        delivery_name: Env.get("NAME_COMPANY", "delivery")
      };

      // Prepara para o envio do email
      let mail = await Mail.send(
        "emails.reset-password",
        configMail,
        (message) => {
          message.from("foo@bar.com");
          message.to(Env.get("MAIL_TEST", email));
          message.subject("Recuperação de senha");
        }
      );
      // Verifica se foi enviado com sucesso
      if (!mail) {
        throw {
          code: 1102,
          message: "Erro ao enviar email"
        };
      }

      await trx.commit();

      return response
        .status(200)
        .send({ message: "E-mail de recuperação enviado!" });
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: "Erro ao recuperar senha", error });
    }
  }
  async remember({ request, response }) {
    try {
      let token = request.input("token");

      let tokenConfirm = await Token.query()
        .where({ token, is_revoked: false, type: "reset_password" })
        .fetch();

      if (tokenConfirm.rows.length === 0) {
        throw {
          code: 1202,
          message: "Token Inválido"
        };
      }
      tokenConfirm = tokenConfirm.toJSON();
      return response
        .status(200)
        .send({ message: "Token válido", user_id: tokenConfirm.user_id });
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Erro ao validar token", error });
    }
  }
  async reset({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      let { password, password_confirmation, user_id, token } = request.all();

      // Checa se as senhas coincidem
      if (password !== password_confirmation) {
        throw {
          code: 1300,
          message: "Senhas não coincidem"
        };
      }

      // Busca por um token
      let tokenConfirm = await Token.query()
        .where({ token, is_revoked: false, type: "reset_password" })
        .fetch();

      // Verifica se o token é válido e está ativo
      if (tokenConfirm.rows.length === 0) {
        throw {
          code: 1301,
          message: "Token Inválido"
        };
      }

      // Pega a primeira posição da busca
      tokenConfirm = tokenConfirm.rows[0];

      // Moficia o token para revoked
      tokenConfirm.merge({ is_revoked: true });

      // Salva modificação
      tokenConfirm.save(trx);

      // Busca usuário
      let user = await User.find(user_id);

      // Atualiza a senha
      user.merge({ password });

      // Salva alteraçao
      await user.save(trx);

      trx.commit();

      return response
        .status(200)
        .send({ message: "Senha alterada. Tente realizar login" });
    } catch (error) {
      trx.rollback();
      return response
        .status(400)
        .send({ message: "Erro ao validar token", error });
    }
  }
}

module.exports = AuthController;
