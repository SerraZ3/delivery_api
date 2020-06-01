"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  orderProducts() {
    return this.hasMany("App/Models/OrderProduct");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory");
  }
  images() {
    return this.belongsToMany("App/Models/Image");
  }
  loyaltyCards() {
    return this.belongsToMany("App/Models/LoyaltyCard");
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon");
  }
}

module.exports = Product;
