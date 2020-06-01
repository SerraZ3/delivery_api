"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  orderStatus() {
    return this.belongsTo("App/Models/OrderStatus");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
  person() {
    return this.belongsTo("App/Models/Person");
  }
  address() {
    return this.belongsTo("App/Models/Address");
  }
}

module.exports = Order;
