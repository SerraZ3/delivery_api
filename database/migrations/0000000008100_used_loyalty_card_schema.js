"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsedLoyaltyCardSchema extends Schema {
  up() {
    this.create("used_loyalty_cards", (table) => {
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("used_loyalty_cards");
  }
}

module.exports = UsedLoyaltyCardSchema;
