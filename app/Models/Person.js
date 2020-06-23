"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Person extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  address() {
    return this.belongsTo("App/Models/Address");
  }
  orders() {
    return this.hasMany("App/Models/Order");
  }
  phone() {
    return this.belongsTo("App/Models/Phone");
  }
}

module.exports = Person;
