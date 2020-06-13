"use strict";

const User = use("App/Models/User");
const Transform = use("App/Transformers/Admin/UserTransformer");
const Database = use("Database");

const Role = use("Role");

/**
 * Resourceful controller for interacting with deliverymen
 */
class DeliverymanController {
  /**
   * Show a list of all deliverymen.
   * GET deliverymen
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   */
  async index({ request, response, pagination }) {
    const { name, way, order } = request.all();
    // Pelo ID do entregador
    const deliverymanRole = await Role.findBy("slug", "deliveryman");

    const query = Database.select([
      "u.id",
      "u.email",
      "u.active",
      "p.name",
      "p.cpf",
      "p.date_birth",
      "r.name as role_name",
      "r.slug",
      "r.description",
      "u.created_at",
      "u.updated_at"
    ])
      .from("users as u")
      .join("people as p", "p.user_id", "u.id")
      .join("role_user as rs", function () {
        this.on("u.id", "rs.user_id").onIn("rs.role_id", [deliverymanRole.id]);
      })
      .join("roles as r", "r.id", "rs.role_id");

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
          query.orderBy("p.name", "desc");
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

    return response.send(user);
  }

  /**
   * Delete a deliveryman with id.
   * DELETE deliverymen/:id
   *
   * @param {Object}   ctx
   * @param {Id}       ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const user = await User.findOrFail(id);
    try {
      // Pelo ID do entregador
      const deliverymanRole = await Role.findBy("slug", "deliveryman");
      // Disvincula entregador do cargo
      await user.roles().detach([deliverymanRole.id], null, trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response.status(500).send({
        message: "Não foi possivel deletar entregador no momento"
      });
    }
  }
}

module.exports = DeliverymanController;
