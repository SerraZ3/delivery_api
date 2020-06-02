"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCardUser extends Model {
  orders() {
    return this.belongsToMany("App/Models/Order").pivotModel(
      "App/Models/LoyaltyCardUserOrder"
    );
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
  loyaltyCard() {
    return this.belongsToMany("App/Models/LoyaltyCard");
  }
}

module.exports = LoyaltyCardUser;
