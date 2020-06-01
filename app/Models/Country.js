"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Country extends Model {
  states() {
    return this.hasMany("App/Models/State");
  }
}

module.exports = Country;
