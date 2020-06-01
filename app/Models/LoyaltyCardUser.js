"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCardUser extends Model {
  orders() {
    return this.belongsToMany("App/Models/Order");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = LoyaltyCardUser;
