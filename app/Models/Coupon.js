"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Coupon extends Model {
  discountApplication() {
    return this.belongsTo("App/Models/DiscountApplication");
  }
  orders() {
    return this.belongsToMany("App/Models/Order").pivotModel(
      "App/Models/CouponOrder"
    );
  }
  products() {
    return this.belongsToMany("App/Models/Product").pivotModel(
      "App/Models/CouponProduct"
    );
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory").pivotModel(
      "App/Models/CouponProductCategory"
    );
  }
  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/CouponUser"
    );
  }
}

module.exports = Coupon;
