"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Geolocation extends Model {
  addresses() {
    return this.hasMany("App/Models/Address");
  }
  orders() {
    return this.hasMany("App/Models/Order");
  }
}

module.exports = Geolocation;
