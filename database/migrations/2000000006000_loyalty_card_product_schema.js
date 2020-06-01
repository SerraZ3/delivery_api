"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardProductSchema extends Schema {
  up() {
    this.create("loyalty_card_products", (table) => {
      table
        .integer("loyalty_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalty_cards")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("loyalty_card_products");
  }
}

module.exports = LoyaltyCardProductSchema;
