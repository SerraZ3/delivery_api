"use strict";

const DeliveryType = use("App/Models/DeliveryType");
const Transform = use("App/Transformers/Admin/DeliveryTypeTransformer");
const Database = use("Database");
/**
 * Resourceful controller for interacting with deliverytypes
 */
class DeliveryTypeController {
  /**
   * Show a list of all deliverytypes.
   * GET deliverytypes
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   * @param {Transform}  ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, order, way } = request.all();

    const query = DeliveryType.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      query.orWhere("price", parseInt(name));
    }

    // Filtra pelo sentido crescente ou descrente
    if (way === "desc") {
      // Filtra pela ordem do preço ou nome
      if (order === "price") {
        query.orderBy("price", "desc");
      } else {
        query.orderBy("name", "desc");
      }
    } else {
      // Filtra pela ordem do preço ou nome
      if (order === "price") {
        query.orderBy("price");
      } else {
        query.orderBy("name");
      }
    }

    let deliveryType = await query.paginate(pagination.page, pagination.limit);
    deliveryType = await transform.paginate(deliveryType, Transform);

    return response.send(deliveryType);
  }

  /**
   * Display a single deliverytype.
   * GET deliverytypes/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    let deliveryType = await DeliveryType.findOrFail(id);

    deliveryType = await transform.item(
      deliveryType,
      "Admin/DeliveryTypeTransformer.withTimestamp"
    );
    return response.send(deliveryType);
  }

  /**
   * Create/save a new deliverytype.
   * POST deliverytypes
   *
   * @param {Object}    ctx
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction();

    try {
      const { name, price } = request.all();

      let deliveryType = await DeliveryType.create(
        {
          name,
          price
        },
        trx
      );

      await trx.commit();

      deliveryType = await transform.item(deliveryType, Transform);

      return response.status(201).send(deliveryType);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel criar o tipo de entrega nesse momento!"
      });
    }
  }

  /**
   * Update deliverytype details.
   * PUT or PATCH deliverytypes/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let deliveryType = await DeliveryType.findOrFail(id);
    try {
      const { name, price } = request.all();

      deliveryType.merge({
        name,
        price
      });
      await deliveryType.save(trx);

      await trx.commit();

      deliveryType = await transform.item(deliveryType, Transform);

      return response.status(201).send(deliveryType);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel atualizar o tipo de entrega nesse momento!"
      });
    }
  }

  /**
   * Delete a deliverytype with id.
   * DELETE deliverytypes/:id
   *
   * @param {Object}   ctx
   * @param {Id}       ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const deliveryType = await DeliveryType.findOrFail(id);
    try {
      await deliveryType.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rolback();
      return response.status(500).send({
        message: "Não foi possivel deletar o tipo de entraga no momento"
      });
    }
  }
}

module.exports = DeliveryTypeController;
