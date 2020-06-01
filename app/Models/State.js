"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class State extends Model {
  cities() {
    return this.hasMany("App/Models/City");
  }
  country() {
    return this.belongsTo("App/Models/Country");
  }
}

module.exports = State;
