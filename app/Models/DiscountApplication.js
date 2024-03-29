"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class DiscountApplication extends Model {
  loyaltyCards() {
    return this.hasMany("App/Models/LoyaltyCard");
  }
  coupons() {
    return this.hasMany("App/Models/Coupon");
  }
}

module.exports = DiscountApplication;
