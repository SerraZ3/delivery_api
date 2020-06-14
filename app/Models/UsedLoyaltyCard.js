"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UsedLoyaltyCard extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  loyaltyCard() {
    return this.belongsTo("App/Models/LoyaltyCard");
  }
  order() {
    return this.belongsTo("App/Models/Order");
  }
}

module.exports = UsedLoyaltyCard;
