"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class DeliveryType extends Model {
  orders() {
    return this.hasMany("App/Models/Order");
  }
}

module.exports = DeliveryType;
