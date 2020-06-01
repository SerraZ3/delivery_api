"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  orderStatus() {
    return this.belongsTo("App/Models/OrderStatus");
  }
}

module.exports = Order;
