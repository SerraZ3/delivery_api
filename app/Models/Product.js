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
}

module.exports = Product;
