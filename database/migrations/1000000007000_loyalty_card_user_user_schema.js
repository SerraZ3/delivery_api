"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardUserUserSchema extends Schema {
  up() {
    this.table("loyalty_card_users", (table) => {
      // alter table
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("loyalty_card_users", (table) => {
      // reverse alternations
      table.dropForeign("user_id");
    });
  }
}

module.exports = LoyaltyCardUserUserSchema;
