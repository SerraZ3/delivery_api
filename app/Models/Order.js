"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("afterFind", "OrderHook.UpdateValues");
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
  usedLoyaltyCard() {
    return this.hasMany("App/Models/UsedLoyaltyCard");
  }
  products() {
    return this.belongsToMany("App/Models/Product")
      .pivotModel("App/Models/OrderProduct")
      .withPivot(["quantity"]);
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon").pivotModel(
      "App/Models/CouponOrder"
    );
  }
}

module.exports = Order;
