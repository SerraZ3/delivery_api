"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCard extends Model {
  loyaltyCardUser() {
    return this.hasOne("App/Models/LoyaltyCardUser");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory");
  }
  products() {
    return this.belongsToMany("App/Models/Product");
  }
  discountApplication() {
    return this.belongsTo("App/Models/DiscountApplication");
  }
}

module.exports = LoyaltyCard;
