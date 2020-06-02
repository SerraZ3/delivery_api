"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  orderProducts() {
    return this.hasMany("App/Models/OrderProduct");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory").pivotModel(
      "App/Models/ProductProductCategory"
    );
  }
  images() {
    return this.belongsToMany("App/Models/Image").pivotModel(
      "App/Models/ProductImage"
    );
  }
  loyaltyCards() {
    return this.belongsToMany("App/Models/LoyaltyCard").pivotModel(
      "App/Models/LoyaltyCardProduct"
    );
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon").pivotModel(
      "App/Models/CouponProduct"
    );
  }
}

module.exports = Product;
