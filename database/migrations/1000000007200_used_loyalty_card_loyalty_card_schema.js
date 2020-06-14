"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsedLoyaltyCardLoyaltyCardSchema extends Schema {
  up() {
    this.table("used_loyalty_cards", (table) => {
      // alter table
      table
        .integer("loyalty_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalty_cards")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("used_loyalty_cards", (table) => {
      // reverse alternations
      table.dropForeign("loyalty_card_id");
    });
  }
}

module.exports = UsedLoyaltyCardLoyaltyCardSchema;
