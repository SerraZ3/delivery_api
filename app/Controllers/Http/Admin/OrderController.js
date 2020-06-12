"use strict";

const Order = use("App/Models/Order");
const Transform = use("App/Transformers/Admin/OrderTransformer");
const Database = use("Database");
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   * @param {Transform}  ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, way, order } = request.all();
    // Pelo ID do entregador
    const query = Database.select([
      "os.name as order_status_name",
      "os.slug as order_status_slug",
      "os.color as order_status_color",
      "u.email as user_email",
      "u.active as user_active",
      "up.name as user_name",
      "up.date_birth as user_date_birth",
      "p.name as deliveryman_name",
      "a.street as address_street",
      "a.neightborhood as address_neightborhood",
      "a.zip_code as address_zip_code",
      "a.number as address_number",
      "c.name as city_name",
      "s.name as state_name",
      "co.name_br as country_name_br",
      "co.name_en as country_name_en",
      "o.created_at as order_created_at",
      "o.updated_at as order_updated_at"
    ])
      .from("orders as o")
      .join("order_statuses as os", "os.id", "o.order_status_id")
      .join("users as u", "u.id", "o.user_id")
      .join("people as up", "u.id", "up.user_id")
      .join("people as p", "p.id", "o.person_id")
      .join("addresses as a", "a.id", "o.address_id")
      .join("cities as c", "c.id", "a.city_id")
      .join("states as s", "s.id", "c.state_id")
      .join("countries as co", "co.id", "s.country_id");

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("os.name", "ILIKE", `%${name}%`);
      query.orWhere("os.slug", "ILIKE", `%${name}%`);
      query.orWhere("os.color", "ILIKE", `%${name}%`);
      query.orWhere("u.email", "ILIKE", `%${name}%`);
      query.orWhere("up.name", "ILIKE", `%${name}%`);
      query.orWhere("p.name", "ILIKE", `%${name}%`);
      query.orWhere("a.street", "ILIKE", `%${name}%`);
      query.orWhere("a.neightborhood", "ILIKE", `%${name}%`);
      query.orWhere("c.name", "ILIKE", `%${name}%`);
      query.orWhere("s.name", "ILIKE", `%${name}%`);
      query.orWhere("co.name_br", "ILIKE", `%${name}%`);
      query.orWhere("co.name_en", "ILIKE", `%${name}%`);
    }

    // Filtra pelo sentido crescente ou descrente
    if (way === "asc") {
      switch (order) {
        case "email":
          query.orderBy("u.email");
          break;
        case "active":
          query.orderBy("u.active");
          break;
        case "name":
          query.orderBy("up.name");
          break;
        case "deliveryman":
          query.orderBy("p.name");
          break;
        case "street":
          query.orderBy("a.street");
          break;
        case "neightborhood":
          query.orderBy("a.neightborhood");
          break;
        case "city":
          query.orderBy("c.name");
          break;
        default:
          query.orderBy("o.created_at");
          break;
      }
    } else {
      switch (order) {
        case "email":
          query.orderBy("u.email", "desc");
          break;
        case "active":
          query.orderBy("u.active", "desc");
          break;
        case "name":
          query.orderBy("up.name", "desc");
          break;
        case "deliveryman":
          query.orderBy("p.name", "desc");
          break;
        case "street":
          query.orderBy("a.street", "desc");
          break;
        case "neightborhood":
          query.orderBy("a.neightborhood", "desc");
          break;
        case "city":
          query.orderBy("c.name", "desc");
          break;
        default:
          query.orderBy("o.created_at", "desc");
          break;
      }
    }

    let user = await query.paginate(pagination.page, pagination.limit);

    return response.send(user);
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    let order = await Order.findOrFail(id);
    let teste = await order.products().fetch();
    console.log(teste);
    console.log(order);
    order = await transform.item(order, "Admin/OrderTransformer.withTimestamp");
    return response.send(order);
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let order = await Order.findOrFail(id);
    try {
      const { order_status_id, person_id } = request.all();
      order.merge({
        order_status_id,
        person_id
      });
      await order.save(trx);

      await trx.commit();

      order = await transform
        .include("person,roles,permissions")
        .item(order, Transform);

      return response.status(201).send(order);
    } catch (error) {
      await trx.rollback();
      console.log(error);

      response.status(400).send({
        message: "Não foi possivel atualizar pedido nesse momento!"
      });
    }
  }
}

module.exports = OrderController;
