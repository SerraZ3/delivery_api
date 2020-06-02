"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProductCategory extends Model {
  products() {
    return this.belongsToMany("App/Models/Product");
  }
  images() {
    return this.belongsToMany("App/Models/Image").pivotModel(
      "App/Models/ProductCategoryImage"
    );
  }
  loyaltyCards() {
    return this.belongsToMany("App/Models/LoyaltyCard");
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon");
  }
}

module.exports = ProductCategory;
