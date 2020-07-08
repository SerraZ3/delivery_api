"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TypeEstablishment extends Model {
  establishments() {
    return this.hasMany("App/Models/Establishment");
  }
}

module.exports = TypeEstablishment;
