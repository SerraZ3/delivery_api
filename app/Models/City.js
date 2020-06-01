"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class City extends Model {
  addresses() {
    return this.hasMany("App/Models/Address");
  }
}

module.exports = City;
