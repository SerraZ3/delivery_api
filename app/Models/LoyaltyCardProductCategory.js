"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class LoyaltyCardProductCategory extends Model {
  product() {
    return this.belongsTo("App/Models/Product");
  }

  loyaltyCardCategory() {
    return this.belongsTo("App/Models/LoyaltyCardCategory");
  }

  /**
   * Override this method or it will try to return id on save.
   */
  static get primaryKey() {
    return null;
  }

  static get incrementing() {
    return false;
  }

  // /**
  //  * Legacy pivot table does not have created_at column but YMMV.
  //  */
  // static get createdAtColumn() {
  //   return undefined;
  // }

  // /**
  //  * Legacy pivot table does not have updated_at column but YMMV.
  //  */
  // static get updatedAtColumn() {
  //   return undefined;
  // }
}

module.exports = LoyaltyCardProductCategory;
