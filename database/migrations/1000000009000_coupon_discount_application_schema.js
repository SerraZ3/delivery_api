"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponDiscountApplicationSchema extends Schema {
  up() {
    this.table("coupons", (table) => {
      // alter table
      table
        .integer("discount_application_id")
        .unsigned()
        .references("id")
        .inTable("discount_applications")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("coupons", (table) => {
      // reverse alternations
      table.dropForeign("discount_application_id");
    });
  }
}

module.exports = CouponDiscountApplicationSchema;
