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
}

module.exports = LoyaltyCard;
