"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardProductCategorySchema extends Schema {
  up() {
    this.create("loyalty_card_product_categories", (table) => {
      table
        .integer("loyalty_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalty_cards")
        .onDelete("CASCADE");
      table
        .integer("product_category_id")
        .unsigned()
        .references("id")
        .inTable("product_categories")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("loyalty_card_product_categories");
  }
}

module.exports = LoyaltyCardProductCategorySchema;
