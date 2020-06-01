"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCard extends Model {
  loyaltyCardUser() {
    return this.hasOne("App/Models/LoyaltyCardUser");
  }
}

module.exports = LoyaltyCard;
