"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardUserSchema extends Schema {
  up() {
    this.create("loyalty_card_users", (table) => {
      table.increments();
      table.decimal("counter", 3, 0);
      table.timestamps();
    });
  }

  down() {
    this.drop("loyalty_card_users");
  }
}

module.exports = LoyaltyCardUserSchema;
