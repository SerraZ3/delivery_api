"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsedLoyaltyCardUserSchema extends Schema {
  up() {
    this.table("used_loyalty_cards", (table) => {
      // alter table
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("used_loyalty_cards", (table) => {
      // reverse alternations
      table.dropForeign("user_id");
    });
  }
}

module.exports = UsedLoyaltyCardUserSchema;
