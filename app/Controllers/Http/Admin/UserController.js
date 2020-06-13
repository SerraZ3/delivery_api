"use strict";

const User = use("App/Models/User");
const Transform = use("App/Transformers/Admin/UserTransformer");
const Database = use("Database");

const Mail = use("Mail");

const Env = use("Env");

const Role = use("Role");

const Token = use("App/Models/Token");
const Hash = use("Hash");

const { cpf } = require("cpf-cnpj-validator");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   * @param {Transform}  ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, way, order } = request.all();

    const query = User.query().innerJoin(
      "people",
      "users.id",
      "people.user_id"
    );

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      query.orWhere("email", "ILIKE", `%${name}%`);
    }

    // Filtra pelo sentido crescente ou descrente
    if (way === "desc") {
      // Filtra pela ordem do preço ou nome
      switch (order) {
        case "email":
          query.orderBy("email", "desc");
          break;
        case "active":
          query.orderBy("active", "desc");
          break;
        default:
          query.orderBy("name", "desc");
          break;
      }
    } else {
      // Filtra pela ordem do preço ou nome
      switch (order) {
        case "email":
          query.orderBy("email");
          break;
        case "active":
          query.orderBy("active");
          break;
        default:
          query.orderBy("name");
          break;
      }
    }

    let user = await query.paginate(pagination.page, pagination.limit);
    user = await transform
      .include("roles")
      .paginate(user, "Admin/UserTransformer.completeWithTimestamp");

    return response.send(user);
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    let user = await User.findOrFail(id);

    user = await transform
      .include("person,roles,permissions")
      .item(user, "Admin/UserTransformer.withTimestamp");
    return response.send(user);
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {Object}    ctx
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async store({ request, response, transform }) {
    // Criando uma transaction (Serve para cadastrar diversos elementos no DB e garantir que ou todos serão cadastrados ou nenhum)
    const trx = await Database.beginTransaction();
    try {
      const { email, person, roles_id, permissions_id } = request.all();

      // Cria usuário
      let user = await User.create({ email, active: false }, trx);

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

      if (roles_id) {
        // Vincula regra ao usuário
        await user.roles().attach(roles_id, null, trx);
      } else {
        // Pelo ID do cliente
        const userRole = await Role.findBy("slug", "client");
        // Vincula regra ao usuário
        await user.roles().attach([userRole.id], null, trx);
      }
      if (permissions_id) {
        // Vincula permissao ao usuário
        await user.permissions().attach(permissions_id, null, trx);
      }
      // Pega o id do usuário
      const user_id = user.toJSON().id;
      // Typo do token
      const type = "new_password";
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
        name: person.name,
        url: `${Env.get("NEW_PASSWORD_URL", "localhost")}/${token}`,
        delivery_name: Env.get("NAME_COMPANY", "delivery")
      };

      // Prepara para o envio do email
      let mail = await Mail.send(
        "emails.new-password",
        configMail,
        (message) => {
          message.from("foo@bar.com");
          message.to(Env.get("MAIL_TEST", email));
          message.subject("Confirmação de e-mail");
        }
      );
      // Verifica se foi enviado com sucesso
      if (!mail) {
        throw {
          code: 1102,
          message: "Erro ao enviar email"
        };
      }

      // Roda todos os valores da trx e garante a persistencia
      await trx.commit();

      user = await transform
        .include("person,roles,permissions")
        .item(user, Transform);

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
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let user = await User.findOrFail(id);
    try {
      const { email, active, person, roles_id, permissions_id } = request.all();
      user.merge({
        email,
        active
      });
      await user.save(trx);
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
      await user.person().update(person, trx);
      // await user.person().where("id", user.id).update(person, trx);

      if (roles_id) {
        // Vincula regra ao usuário
        await user.roles().sync(roles_id, null, trx);
      } else {
        // Pelo ID do cliente
        const userRole = await Role.findBy("slug", "client");
        // Vincula regra ao usuário
        await user.roles().sync([userRole.id], null, trx);
      }
      if (permissions_id) {
        // Vincula permissao ao usuário
        await user.permissions().sync(permissions_id, null, trx);
      }

      await trx.commit();

      user = await transform
        .include("person,roles,permissions")
        .item(user, Transform);

      return response.status(201).send(user);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel atualizar o usuário nesse momento!"
      });
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {Object}   ctx
   * @param {Id}       ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const user = await User.findOrFail(id);
    try {
      await user.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response.status(500).send({
        message: "Não foi possivel deletar o usuário no momento"
      });
    }
  }
}

module.exports = UserController;
