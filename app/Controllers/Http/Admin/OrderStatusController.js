"use strict";

const OrderStatus = use("App/Models/OrderStatus");
const Transform = use("App/Transformers/Admin/OrderStatusTransformer");
const Database = use("Database");

/**
 * Resourceful controller for interacting with orderstatuses
 */
class OrderStatusController {
  /**
   * Show a list of all orderstatuses.
   * GET orderstatuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const name = request.input("name");

    const query = OrderStatus.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      query.orWhere("slug", "ILIKE", `%${name}%`);
    }

    let orderStatus = await query.paginate(pagination.page, pagination.limit);
    orderStatus = await transform.paginate(orderStatus, Transform);

    return response.send(orderStatus);
  }

  /**
   * Display a single orderstatus.
   * GET orderstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, transform, response }) {
    let orderStatus = await OrderStatus.findOrFail(id);

    orderStatus = await transform.item(
      orderStatus,
      "Admin/OrderStatusTransformer.withTimestamp"
    );
    return response.send(orderStatus);
  }

  /**
   * Create/save a new orderstatus.
   * POST orderstatuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction();

    try {
      const { name, slug, color } = request.all();

      if (color.match(/([#]{1}[0-9a-fA-f]{5,8})/g) === null) {
        throw {
          error: {
            message: "Formato da cor inválido",
            field: "color"
          }
        };
      }

      let orderStatus = await OrderStatus.create(
        {
          name,
          slug,
          color
        },
        trx
      );

      await trx.commit();

      orderStatus = await transform.item(orderStatus, Transform);

      return response.status(201).send(orderStatus);
    } catch (error) {
      await trx.rollback();

      response.status(400).send(
        error.error
          ? error
          : {
              message:
                "Não foi possivel criar o status do pedido nesse momento!"
            }
      );
    }
  }

  /**
   * Update orderstatus details.
   * PUT or PATCH orderstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let orderStatus = await OrderStatus.findOrFail(id);
    try {
      const { name, slug, color } = request.all();
      if (color.match(/([#]{1}[0-9a-fA-f]{5,8})/g) === null) {
        throw {
          error: {
            message: "Formato da cor inválido",
            field: "color"
          }
        };
      }

      orderStatus.merge({ name, slug, color });
      await orderStatus.save(trx);

      await trx.commit();

      orderStatus = await transform.item(orderStatus, Transform);

      return response.status(201).send(orderStatus);
    } catch (error) {
      await trx.rollback();

      response.status(400).send(
        error.error
          ? error
          : {
              message:
                "Não foi possivel atualizar o status do pedido nesse momento!"
            }
      );
    }
  }

  /**
   * Delete a orderstatus with id.
   * DELETE orderstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const orderStatus = await OrderStatus.findOrFail(id);
    try {
      await orderStatus.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response
        .status(500)
        .send({ message: "Não foi possivel deletar esse status de pedido" });
    }
  }
}

module.exports = OrderStatusController;
