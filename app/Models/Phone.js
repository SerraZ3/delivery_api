"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Phone extends Model {
  establishment() {
    return this.hasOne("App/Models/Establishment");
  }
  person() {
    return this.hasOne("App/Models/Person");
  }
}

module.exports = Phone;
