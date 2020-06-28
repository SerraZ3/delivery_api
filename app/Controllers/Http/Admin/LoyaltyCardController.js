"use strict";

const LoyaltyCard = use("App/Models/LoyaltyCard");
const DiscountApplication = use("App/Models/DiscountApplication");
const Transform = use("App/Transformers/Admin/LoyaltyCardTransformer");
const Database = use("Database");

/**
 * Resourceful controller for interacting with loyaltycards
 */
class LoyaltyCardController {
  /**
   * Show a list of all loyaltycards.
   * GET loyaltycards
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   * @param {Transform}  ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, order, way } = request.all();

    const query = LoyaltyCard.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("code", "ILIKE", `%${name}%`);
      query.orWhere("type", "ILIKE", `%${name}%`);
      query.orWhere("value", parseFloat(name));
    }

    // Filtra pelo sentido crescente ou descrente
    if (way === "desc") {
      switch (order) {
        case "code":
          query.orderBy("code", "desc");
          break;
        case "active":
          query.orderBy("active", "desc");
          break;
        case "type":
          query.orderBy("type", "desc");
          break;
        case "value":
          query.orderBy("value", "desc");
          break;
        case "quantity":
          query.orderBy("quantity", "desc");
          break;
        case "apply_total_order":
          query.orderBy("apply_total_order", "desc");
          break;
        case "recursive":
          query.orderBy("recursive", "desc");
          break;
        default:
          query.orderBy("created_at", "desc");
          break;
      }
    } else {
      switch (order) {
        case "code":
          query.orderBy("code");
          break;
        case "active":
          query.orderBy("active");
          break;
        case "type":
          query.orderBy("type");
          break;
        case "value":
          query.orderBy("value");
          break;
        case "quantity":
          query.orderBy("quantity");
          break;
        case "apply_total_order":
          query.orderBy("apply_total_order");
          break;
        case "recursive":
          query.orderBy("recursive");
          break;
        default:
          query.orderBy("created_at");
          break;
      }
    }

    let loyaltyCard = await query.paginate(pagination.page, pagination.limit);
    loyaltyCard = await transform.paginate(loyaltyCard, Transform);

    return response.send(loyaltyCard);
  }

  /**
   * Display a single loyaltycard.
   * GET loyaltycards/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    let loyaltyCard = await LoyaltyCard.findOrFail(id);

    loyaltyCard = await transform
      .include("products,productCategories")
      .item(loyaltyCard, Transform);
    return response.send(loyaltyCard);
  }

  /**
   * Create/save a new loyaltycard.
   * POST loyaltycards
   *
   * @param {Object}    ctx
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction();

    try {
      const {
        code,
        value,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application,
        product_categories,
        products
      } = request.all();

      let discountApllication = await DiscountApplication.findBy(
        "slug",
        discount_application
      );
      if (active) {
        await LoyaltyCard.query()
          .where("id", ">", 0)
          .update({ active: false }, trx);
      }

      let loyaltyCard = await LoyaltyCard.create(
        {
          code,
          value,
          type,
          recursive,
          active,
          apply_total_order,
          discount_application_id: discountApllication.id
        },
        trx
      );
      if (product_categories) {
        await loyaltyCard
          .productCategories()
          .attach(product_categories, null, trx);
      }
      if (products) {
        await loyaltyCard.products().attach(products, null, trx);
      }
      await trx.commit();

      loyaltyCard = await transform
        .include("products,productCategories")
        .item(loyaltyCard, Transform);

      return response.status(201).send(loyaltyCard);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel criar o cartão fidelidade nesse momento!"
      });
    }
  }

  /**
   * Update loyaltycard details.
   * PUT or PATCH loyaltycards/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let loyaltyCard = await LoyaltyCard.findOrFail(id);
    try {
      const {
        code,
        value,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application,
        product_categories,
        products
      } = request.all();

      let discountApllication = await DiscountApplication.findBy(
        "slug",
        discount_application
      );
      if (active) {
        await LoyaltyCard.query().where("id", ">", 0).update({ active: false });
      }

      loyaltyCard.merge({
        code,
        value,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application_id: discountApllication.id
      });
      await loyaltyCard.save(trx);

      if (product_categories) {
        await loyaltyCard
          .productCategories()
          .sync(product_categories, null, trx);
      }
      if (products) {
        await loyaltyCard.products().sync(products, null, trx);
      }

      await trx.commit();

      loyaltyCard = await transform
        .include("products,productCategories")
        .item(loyaltyCard, Transform);

      return response.status(201).send(loyaltyCard);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel atualizar o cartão fidelidade nesse momento!"
      });
    }
  }

  /**
   * Delete a loyaltycard with id.
   * DELETE loyaltycards/:id
   *
   * @param {Object}   ctx
   * @param {Id}       ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const loyaltyCard = await LoyaltyCard.findOrFail(id);
    try {
      if (loyaltyCard.active) {
        const newLoyaltyActive = await LoyaltyCard.query()
          .where("active", false)
          .orderBy("updated_at", "desc")
          .first();
        newLoyaltyActive.active = true;
        await newLoyaltyActive.save(trx);
      }

      await loyaltyCard.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response.status(500).send({
        message: "Não foi possivel deletar o tipo de entraga no momento"
      });
    }
  }
}

module.exports = LoyaltyCardController;
