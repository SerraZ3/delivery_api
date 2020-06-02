"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProductCategory extends Model {
  products() {
    return this.belongsToMany("App/Models/Product").pivotModel(
      "App/Models/ProductProductCategory"
    );
  }
  images() {
    return this.belongsToMany("App/Models/Image").pivotModel(
      "App/Models/ProductCategoryImage"
    );
  }
  loyaltyCards() {
    return this.belongsToMany("App/Models/LoyaltyCard").pivotModel(
      "App/Models/LoyaltyCardProductCategory"
    );
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon").pivotModel(
      "App/Models/CouponProductCategory"
    );
  }
}

module.exports = ProductCategory;
