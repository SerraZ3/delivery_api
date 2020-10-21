"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Establishment extends Model {
  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/EstablishmentUser"
    );
  }
  phone() {
    return this.belongsTo("App/Models/Phone");
  }
  addresses() {
    return this.belongsToMany("App/Models/Address");
  }
  images() {
    return this.belongsToMany("App/Models/Image")
      .pivotModel("App/Models/EstablishmentImage")
      .withPivot(["menu", "wallpaper"]);
  }
  typeEstablishment() {
    return this.belongsTo("App/Models/TypeEstablishment");
  }

  products() {
    return this.HasMany("App/Models/Product");
  }
}

module.exports = Establishment;
