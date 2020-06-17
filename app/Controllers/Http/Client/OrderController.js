"use strict";

const Order = use("App/Models/Order");
const Coupon = use("App/Models/Coupon");
const Transform = use("App/Transformers/Admin/OrderTransformer");
const Database = use("Database");

class OrderController {
  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   * @param {Auth}      ctx.auth
   */
  async show({ params: { id }, response, transform, auth }) {
    // Pega o usuário do request
    let user = await auth.getUser();
    // Verifica se existe esse pedido vinculado ao usuário
    let checkOrder = await user.orders().where("id", id).fetch();
    // Verifica se existe esse pedido vinculado ao usuário
    if (checkOrder.rows.length > 0) {
      let order = await Order.findOrFail(id);
      order = await transform.item(
        order,
        "Admin/OrderTransformer.withTimestamp"
      );
      return response.status(200).send(order);
    } else {
      return response.status(401).send("Pedido não vinculado a este cliente");
    }
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
   * @param {Auth}      ctx.auth
   */
  async update({ params: { id }, request, response, transform, auth }) {
    const trx = await Database.beginTransaction();
    let order = await Order.findOrFail(id);
    try {
      const {
        address_id,
        delivery_type_id,
        type_payment,
        amount_will_paid,
        products
      } = request.all();
      // Pega o usuário do request
      let user = await auth.getUser();
      // Verifica se existe esse pedido vinculado ao usuário
      let checkOrder = await user.orders().where("id", id).fetch();

      // Verifica se existe esse pedido vinculado ao usuário
      if (!(checkOrder.rows.length > 0)) {
        throw {
          status: 401,
          message: "Pedido não vinculado a este cliente"
        };
      }
      // Verifica se o pedido ja foi enviado
      if (order.order_status_id >= 3) {
        throw {
          status: 401,
          message:
            "O pedido já foi enviado, não é mais possivel ser atualizado. Por favor entre em contato com estabelecimento para fazer modificações!"
        };
      }

      await Order.query(trx).where("id", order.id).update({
        address_id,
        delivery_type_id,
        type_payment,
        amount_will_paid
      });

      let orderProducts = await order.products().sync(products[0], null, trx);

      await Promise.all(
        orderProducts.map(async (orderProduct) => {
          let index = products[0].findIndex(
            (value) => value === orderProduct.product_id
          );

          orderProduct.quantity = products[1][index];

          await orderProduct.save(trx);
        })
      );

      await trx.commit();

      order = await Order.find(order.id);

      order = await transform
        .include("person,roles,permissions")
        .item(order, Transform);

      return response.status(201).send(order);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message:
          error.status == 401
            ? error.message
            : "Não foi possivel atualizar pedido nesse momento!"
      });
    }
  }
  /**
   * store order details.
   * POST orders/:id
   *
   * @param {Object}    ctx
   * @param {Request}   ctx.request
   * @param {Response}  ctx.response
   * @param {Transform} ctx.transform
   * @param {Auth}      ctx.auth
   */
  async store({ request, response, transform, auth }) {
    const trx = await Database.beginTransaction();
    try {
      const {
        address_id,
        delivery_type_id,
        coupons,
        loyalty_card_id,
        type_payment,
        amount_will_paid,
        products
      } = request.all();

      // Pega o usuário do request
      let user = await auth.getUser();

      let order = await Order.create(
        {
          address_id,
          delivery_type_id,
          user_id: user.id,
          order_status_id: 1,
          type_payment,
          amount_will_paid
        },
        trx
      );
      if (order) {
        let orderProducts = await order
          .products()
          .attach(products[0], null, trx);

        await Promise.all(
          orderProducts.map(async (orderProduct) => {
            let index = products[0].findIndex(
              (value) => value === orderProduct.product_id
            );

            orderProduct.quantity = products[1][index];

            await orderProduct.save(trx);
          })
        );
      }

      // if (coupons && coupons.length > 0) {
      //   let couponsID = [];

      //   await coupons.map(async (value) => {
      //     let coupon = await Coupon.find(value);

      //     if (coupon.quantity > 0) {
      //       await Coupon.query(trx).where("id", value).decrement("quantity", 1);
      //       couponsID.push(value);
      //     }
      //   });

      //   await order.coupons().attach(couponsID, null, trx);
      // }
      // if (loyalty_card_id) {
      //   await user
      //     .usedLoyaltyCard()
      //     .create({ order_id: order.id, loyalty_card_id }, trx);
      // }

      await trx.commit();
      order = await Order.find(order.id);

      order = await transform
        .include("person,roles,permissions")
        .item(order, Transform);

      return response.status(201).send(order);
    } catch (error) {
      await trx.rollback();

      response.status(400).send({
        message: "Não foi possivel cadastrar o pedido nesse momento!"
      });
    }
  }
  /**
   * delete order details.
   * DELETE  orders/:id
   *
   * @param {Object}    ctx
   * @param {Id}        ctx.params.id
   * @param {Response}  ctx.response
   * @param {Auth}      ctx.auth
   */
  async destroy({ params: { id }, response, auth }) {
    const trx = await Database.beginTransaction();
    let order = await Order.findOrFail(id);
    try {
      // Pega o usuário do request
      let user = await auth.getUser();
      // Verifica se existe esse pedido vinculado ao usuário
      let checkOrder = await user.orders().where("id", id).fetch();

      // Verifica se existe esse pedido vinculado ao usuário
      if (!(checkOrder.rows.length > 0)) {
        throw {
          status: 401,
          message: "Pedido não vinculado a este cliente"
        };
      }
      if (order.order_status_id >= 3) {
        throw {
          status: 401,
          message:
            "Não é mais possivel cancelar o pedido pelo sistema. Por favor entre em contato com estabelecimento para cancelar ele"
        };
      }
      await Order.query(trx).where("id", order.id).update({
        order_status_id: 2
      });

      await trx.commit();

      return response
        .status(201)
        .send({ message: "Pedido cancelado com sucesso!" });
    } catch (error) {
      await trx.rollback();
      response.status(400).send({
        message: "Não foi possivel cancelar o pedido pedido nesse momento!"
      });
    }
  }
}

module.exports = OrderController;
