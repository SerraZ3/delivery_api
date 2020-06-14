"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static get computed() {
    return ["total_price", "change_cash"];
  }
  async getTotalPrice(order) {
    let products = await this.products().fetch();
    let totalPrice = 0;
    products.rows.map((product) => {
      let quantity = product.$relations.pivot.quantity.toFixed(2);
      let price = product.price;
      totalPrice = totalPrice + price * quantity;
    });

    return await totalPrice.toFixed(2);
  }
  async getChangeCash(order) {
    let totalPrice = await order.total_price;

    return await (order.amount_will_paid - totalPrice).toFixed(2);
  }
  orderStatus() {
    return this.belongsTo("App/Models/OrderStatus");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
  person() {
    return this.belongsTo("App/Models/Person");
  }
  address() {
    return this.belongsTo("App/Models/Address");
  }
  deliveryType() {
    return this.belongsTo("App/Models/DeliveryType");
  }
  products() {
    return this.belongsToMany("App/Models/Product")
      .pivotModel("App/Models/OrderProduct")
      .withPivot(["quantity"]);
  }
  loyaltyCardUsers() {
    return this.belongsToMany("App/Models/LoyaltyCardUser").pivotModel(
      "App/Models/LoyaltyCardUserOrder"
    );
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon").pivotModel(
      "App/Models/CouponOrder"
    );
  }
}

module.exports = Order;
