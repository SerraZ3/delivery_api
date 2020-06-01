"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Coupon extends Model {
  discountApplication() {
    return this.belongsTo("App/Models/DiscountApplication");
  }
  orders() {
    return this.belongsToMany("App/Models/Order");
  }
  products() {
    return this.belongsToMany("App/Models/Product");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory");
  }
}

module.exports = Coupon;
