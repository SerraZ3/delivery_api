"use strict";

const Coupon = use("App/Models/Coupon");
const DiscountApplication = use("App/Models/DiscountApplication");
const Transform = use("App/Transformers/Admin/CouponTransformer");
const Database = use("Database");

/**
 * Resourceful controller for interacting with coupons
 */
class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {Object}     ctx
   * @param {Request}    ctx.request
   * @param {Response}   ctx.response
   * @param {Pagination} ctx.pagination
   * @param {Transform}  ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, order, way } = request.all();

    const query = Coupon.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("code", "ILIKE", `%${name}%`);
      query.orWhere("type", "ILIKE", `%${name}%`);
      query.orWhere("value", parseFloat(name));
      query.orWhere("quantity", parseInt(name));
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
        case "quantity":
          query.orderBy("quantity", "desc");
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
        case "quantity":
          query.orderBy("quantity");
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

    let coupon = await query.paginate(pagination.page, pagination.limit);
    coupon = await transform.paginate(coupon, Transform);

    return response.send(coupon);
  }

  /**
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    let coupon = await Coupon.findOrFail(id);

    coupon = await transform
      .include("products,productCategories,users")
      .item(coupon, Transform);
    return response.send(coupon);
  }

  /**
   * Create/save a new coupon.
   * POST coupons
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
        quantity,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application,
        product_categories,
        products,
        users
      } = request.all();

      let discountApllication = await DiscountApplication.findBy(
        "slug",
        discount_application
      );

      let coupon = await Coupon.create(
        {
          code,
          value,
          quantity,
          type,
          recursive,
          active,
          apply_total_order,
          discount_application_id: discountApllication.id
        },
        trx
      );
      if (product_categories) {
        await coupon.productCategories().attach(product_categories, null, trx);
      }
      if (products) {
        await coupon.products().attach(products, null, trx);
      }
      if (users) {
        await coupon.users().attach(users, null, trx);
      }
      await trx.commit();

      coupon = await transform
        .include("products,productCategories, users")
        .item(coupon, Transform);

      return response.status(201).send(coupon);
    } catch (error) {
      await trx.rollback();
      // console.log(error);

      response.status(400).send({
        message: "Não foi possivel criar o cupom nesse momento!"
      });
    }
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let coupon = await Coupon.findOrFail(id);
    try {
      const {
        code,
        value,
        quantity,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application,
        product_categories,
        products,
        users
      } = request.all();

      let discountApllication = await DiscountApplication.findBy(
        "slug",
        discount_application
      );

      coupon.merge({
        code,
        value,
        quantity,
        type,
        recursive,
        active,
        apply_total_order,
        discount_application_id: discountApllication.id
      });
      await coupon.save(trx);

      if (product_categories) {
        await coupon.productCategories().sync(product_categories, null, trx);
      }
      if (products) {
        await coupon.products().sync(products, null, trx);
      }
      if (users) {
        await coupon.users().sync(users, null, trx);
      }

      await trx.commit();

      coupon = await transform
        .include("products,productCategories, users")
        .item(coupon, Transform);

      return response.status(201).send(coupon);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel atualizar o cupom nesse momento!"
      });
    }
  }

  /**
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {Object}   ctx
   * @param {Id}       ctx.params.id
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const coupon = await Coupon.findOrFail(id);
    try {
      await coupon.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response.status(500).send({
        message: "Não foi possivel deletar o cupom no momento"
      });
    }
  }
}

module.exports = CouponController;
