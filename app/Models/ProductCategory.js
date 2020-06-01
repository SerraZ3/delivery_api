"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProductCategory extends Model {
  products() {
    return this.belongsToMany("App/Models/Product");
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory");
  }
  loyaltyCards() {
    return this.belongsToMany("App/Models/LoyaltyCard");
  }
}

module.exports = ProductCategory;
