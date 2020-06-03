"use strict";
const Database = use("Database");
const User = use("App/Models/User");
const Role = use("Role");

const { cpf } = require("cpf-cnpj-validator");

class AuthController {
  async register({ request, response }) {
    // Criando uma transaction (Serve para cadastrar diversos elementos no DB e garantir que ou todos serão cadastrados ou nenhum)
    const trx = await Database.beginTransaction();
    try {
      const { email, password, password_confirmation, person } = request.all();

      // Checa se as senhas coincidem
      if (password !== password_confirmation) {
        throw {
          code: 1000,
          message: "Senhas não coincidem"
        };
      }
      // Verifica se email existe
      const checkEmail = await User.findBy("email", email);
      if (checkEmail) {
        throw {
          code: 1001,
          message: "Email já cadastrado!"
        };
      }

      // Cria usuário
      const user = await User.create({ email, password }, trx);

      // Verifica se os dados da pessoa existe para ser registrado
      if (person) {
        if (person.name) {
          if (person.cpf) {
            if (person.date_birth) {
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
              // Transform date_birth in timestamp
              person.date_birth = new Date(
                person.date_birth.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
              );

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
            } else {
              throw {
                code: 1005,
                message: "Preencha com a data de nascimento"
              };
            }
          } else {
            throw {
              code: 1006,
              message: "Preencha com o CPF"
            };
          }
        } else {
          throw {
            code: 1007,
            message: "Preencha com o nome"
          };
        }
      }

      const userRole = await Role.findBy("slug", "client");

      await user.roles().attach([userRole.id], null, trx);
      // Roda todos os valores da trx e garante a persistencia
      await trx.commit();

      return response
        .status(201)
        .send({ data: user, message: "Usuário criado com sucesso!" });
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: "Erro ao realizar cadastro", error });
    }
  }
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    let data = await auth.withRefreshToken().attempt(email, password);

    /**
     *
     * "type": "bearer",
     * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1LCJpYXQiOjE1OTExNDkxMDV9.NhAuaVopovpL7YP0yDQWCGCbkxNikBct-NggNiG1Ubw",
     * "refreshToken": "f28359d813b1b4ba3e41a9766890cbadKulIGKvtbLAbLQ854mcQ1NXYSSGkEv88pN0PlnYIs59z9Nw6b5JLrkGxJMUNZRkp"
     */

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
  async forgot({ request, response }) {}
  async remember({ request, response }) {}
  async reset({ request, response }) {}
}

module.exports = AuthController;
