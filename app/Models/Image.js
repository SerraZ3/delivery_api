"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class Image extends Model {
  static get computed() {
    return ["url"];
  }
  getUrl({ path }) {
    return `${Env.get("APP_URL_IMAGE")}/${path}`;
  }
  products() {
    return this.belongsToMany("App/Models/Product")
      .pivotModel("App/Models/ProductImage")
      .withPivot(["main"]);
  }
  productCategories() {
    return this.belongsToMany("App/Models/ProductCategory")
      .pivotModel("App/Models/ProductCategoryImage")
      .withPivot(["main"]);
  }
  establishments() {
    return this.belongsToMany("App/Models/Establishment")
      .pivotModel("App/Models/EstablishmentImage")
      .withPivot(["main"]);
  }
}

module.exports = Image;
