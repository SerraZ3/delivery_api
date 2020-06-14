"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsedLoyaltyCardOrderSchema extends Schema {
  up() {
    this.table("used_loyalty_cards", (table) => {
      // alter table
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("used_loyalty_cards", (table) => {
      // reverse alternations
      table.dropForeign("order_id");
    });
  }
}

module.exports = UsedLoyaltyCardOrderSchema;
