"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class Image extends Model {
  static get computed() {
    return ["url"];
  }
  getUrl({ path }) {
    return `${Env.get("APP_URL")}/uploads/${path}`;
  }
  products() {
    return this.belongsToMany("App/Models/Product").pivotModel(
      "App/Models/ProductImage"
    );
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory").pivotModel(
      "App/Models/ProductCategoryImage"
    );
  }
}

module.exports = Image;
