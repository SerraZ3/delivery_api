"use strict";
const Database = use("Database");

const Transformer = use("App/Transformers/Auth/UserTransformer");
const User = use("App/Models/User");
const Phone = use("App/Models/Phone");
const Establishment = use("App/Models/Establishment");
const EstablishmentUser = use("App/Models/EstablishmentUser");
const Role = use("Role");

const Token = use("App/Models/Token");
const Hash = use("Hash");

const Mail = use("Mail");

const Env = use("Env");

const { cpf } = require("cpf-cnpj-validator");

class AuthController {
  /**
   * Cadastra novo cliente
   * GET coupons
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Transform}  ctx.transform
   */
  async registerClient({ request, response, transform }) {
    const trx = await Database.beginTransaction();
    try {
      const { email, password, person, phone } = request.all();

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
        let newPhone = phone.replace(/[^0-9 ]/g, "");

        // Cria a pessoa vinculando as informações do usuário
        const newPerson = await user.person().create(person, trx);

        // Cria um novo telefone
        newPhone = await Phone.create({ number: newPhone }, trx);

        // Vincula telefone a pessoa
        await newPhone.person().save(newPerson, trx);
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
      console.log(error);

      return response
        .status(400)
        .send({ message: "Erro ao realizar cadastro", error });
    }
  }
  /**
   * Cadastra novo estabelecimento e usuário se nencessário
   * GET coupons
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Transform}  ctx.transform
   */
  async registerEstablishment({ request, response, transform }) {
    const trx = await Database.beginTransaction();
    try {
      const { email, password, person, phone, establishment } = request.all();

      let userExist = await User.findBy({ email });
      let user;

      if (userExist) {
        let newEstablishment = await Establishment.create(establishment, trx);
        await newEstablishment.users().attach([userExist.id], null, trx);
        user = userExist;
      } else {
        // Cria usuário
        user = await User.create({ email, password }, trx);
      }

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
        let newPhone = phone.replace(/[^0-9 ]/g, "");

        if (userExist) {
          // Cria um novo telefone
          newPhone = await Phone.findOrCreate(
            { number: newPhone },
            { number: newPhone },
            trx
          );

          person.phone_id = newPhone.id;

          // Cria a pessoa vinculando as informações do usuário
          await user
            .person()
            .where({ id: user.id })
            .transacting(trx)
            .update(person);
        } else {
          // Cria a pessoa vinculando as informações do usuário
          const newPerson = await user.person().create(person, trx);
          // Cria um novo telefone
          newPhone = await Phone.create({ number: newPhone }, trx);

          // Vincula telefone a pessoa
          await newPhone.person().save(newPerson, trx);
        }
      }

      const userRole = await Role.findBy("slug", "admin");

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
      console.log(error);

      return response
        .status(400)
        .send({ message: "Erro ao realizar cadastro", error });
    }
  }
  /**
   * Realiza qualquer l
   * GET coupons
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Auth}       ctx.auth
   * @param {Transform}  ctx.transform
   */
  async login({ request, response, auth, transform }) {
    try {
      const { email, password } = request.all();
      // Valida usuario e gera token
      let data = await auth.withRefreshToken().attempt(email, password);
      let user = await User.findBy({ email });
      user = await transform.item(user, Transformer);

      return response.status(200).send({ data, user });
    } catch (error) {
      return response
        .status(400)
        .send({ message: "E-mail ou senha incorreta" });
    }
  }
  async rolePermission({ request, response, auth }) {
    const establishment_id = request.input("establishment_id");
    let user = await auth.getUser();
    let establishmentUser = null;
    let establishmentUserRoles = [];
    let establishmentUserPermissions = [];

    if (establishment_id) {
      establishmentUser = await EstablishmentUser.findBy({
        user_id: user.id,
        establishment_id
      });
      establishmentUserRoles = await establishmentUser.getRoles();
      establishmentUserPermissions = await establishmentUser.getPermissions();
    } else {
      establishmentUser = await EstablishmentUser.query()
        .where("user_id", user.id)
        .fetch();
      Promise.all(
        establishmentUser.rows.map(async (element) => {
          establishmentUserRoles.push(await element.getRoles());
          establishmentUserPermissions.push(await element.getPermissions());
        })
      );
    }
    let userRoles = await user.getRoles();

    let userPermissions = await user.getPermissions();

    let data = {
      user: { roles: userRoles, permissions: userPermissions },
      establishment: {
        roles: establishmentUserRoles,
        permissions: establishmentUserPermissions
      }
    };

    return response.send({ data, message: "hello" });
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
      let { token, type } = request.all();

      let tokenConfirm = await Token.query()
        .where({ token, is_revoked: false, type })
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
      let {
        password,
        password_confirmation,
        user_id,
        token,
        type
      } = request.all();

      // Checa se as senhas coincidem
      if (password !== password_confirmation) {
        throw {
          code: 1300,
          message: "Senhas não coincidem"
        };
      }

      // Busca por um token
      let tokenConfirm = await Token.query()
        .where({ token, is_revoked: false, type })
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
      user.merge({ password, active: true });

      // Salva alteraçao
      await user.save(trx);

      trx.commit();

      return response
        .status(200)
        .send({ message: "Nova senha registrada. Tente realizar login" });
    } catch (error) {
      trx.rollback();
      return response
        .status(400)
        .send({ message: "Erro ao validar token", error });
    }
  }
}

module.exports = AuthController;
