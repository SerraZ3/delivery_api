"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
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
