"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltCardUserSchema extends Schema {
  up() {
    this.create("loyalt_card_users", (table) => {
      table.increments();
      table.decimal("counter", 3, 0);
      table.timestamps();
    });
  }

  down() {
    this.drop("loyalt_card_users");
  }
}

module.exports = LoyaltCardUserSchema;
