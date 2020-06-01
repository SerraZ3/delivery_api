"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponUserSchema extends Schema {
  up() {
    this.create("coupon_users", (table) => {
      table
        .integer("coupon_id")
        .unsigned()
        .references("id")
        .inTable("coupons")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("coupon_users");
  }
}

module.exports = CouponUserSchema;
