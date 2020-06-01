"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltCardProductCategorySchema extends Schema {
  up() {
    this.create("loyalt_card_product_categories", (table) => {
      table
        .integer("loyalt_card_id")
        .unsigned()
        .references("id")
        .inTable("loyalt_cards")
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
    this.drop("loyalt_card_product_categories");
  }
}

module.exports = LoyaltCardProductCategorySchema;
