"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
  static get traits() {
    return [
      "@provider:Adonis/Acl/HasRole",
      "@provider:Adonis/Acl/HasPermission"
    ];
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  person() {
    return this.hasOne("App/Models/Person");
  }

  orders() {
    return this.hasMany("App/Models/Order");
  }
  usedLoyaltyCard() {
    return this.hasMany("App/Models/UsedLoyaltyCard");
  }
  coupons() {
    return this.belongsToMany("App/Models/Coupon").pivotModel(
      "App/Models/CouponUser"
    );
  }
  establishments() {
    return this.belongsToMany("App/Models/Establishment").pivotModel(
      "App/Models/EstablishmentUser"
    );
  }
  vehicle() {
    return this.hasOne("App/Model/Vehicle");
  }
}

module.exports = User;
