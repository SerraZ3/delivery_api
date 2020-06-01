"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardUserLoyaltyCardSchema extends Schema {
  up() {
    this.table("loyalty_card_users", (table) => {
      // alter table
      table
        .integer("loyalty_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalty_cards")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("loyalty_card_users", (table) => {
      // reverse alternations
      table.dropForeign("loyalty_card_id");
    });
  }
}

module.exports = LoyaltyCardUserLoyaltyCardSchema;
