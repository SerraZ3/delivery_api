"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Address extends Model {
  person() {
    return this.HasOne("App/Models/Person");
  }
  city() {
    return this.belongsTo("App/Models/city");
  }
}

module.exports = Address;
