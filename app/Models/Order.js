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
  deliveryType() {
    return this.belongsTo("App/Models/DeliveryType");
  }
  orderProducts() {
    return this.belongsTo("App/Models/OrderProduct");
  }
  loyaltyCardUsers() {
    return this.belongsToMany("App/Models/LoyaltyCardUser");
  }
}

module.exports = Order;
