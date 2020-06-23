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
}

module.exports = Establishment;
