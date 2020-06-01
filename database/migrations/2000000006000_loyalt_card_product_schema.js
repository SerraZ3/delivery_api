"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltCardProductSchema extends Schema {
  up() {
    this.create("loyalt_card_products", (table) => {
      table
        .integer("loyalt_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalt_cards")
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
    this.drop("loyalt_card_products");
  }
}

module.exports = LoyaltCardProductSchema;
