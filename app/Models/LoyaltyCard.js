"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCard extends Model {
  loyaltyCardUser() {
    return this.hasOne("App/Models/LoyaltyCardUser");
  }
  usedLoyaltyCard() {
    return this.hasMany("App/Models/UsedLoyaltyCard");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory").pivotModel(
      "App/Models/LoyaltyCardProductCategory"
    );
  }
  products() {
    return this.belongsToMany("App/Models/Product").pivotModel(
      "App/Models/LoyaltyCardProduct"
    );
  }
  discountApplication() {
    return this.belongsTo("App/Models/DiscountApplication");
  }
}

module.exports = LoyaltyCard;
