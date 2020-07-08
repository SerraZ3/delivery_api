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
      .withPivot(["main"]);
  }
  typeEstablishment() {
    return this.belongsTo("App/Models/TypeEstablishment");
  }
}

module.exports = Establishment;
