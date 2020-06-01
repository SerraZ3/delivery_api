"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardDiscountApplicationSchema extends Schema {
  up() {
    this.table("loyalty_cards", (table) => {
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
    this.table("loyalty_cards", (table) => {
      // reverse alternations
      table.dropForeign("discount_application_id");
    });
  }
}

module.exports = LoyaltyCardDiscountApplicationSchema;
