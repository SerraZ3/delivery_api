"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductProductCategorySchema extends Schema {
  up() {
    this.create("product_product_categories", (table) => {
      table
        .integer("product_category_id")
        .unsigned()
        .references("id")
        .inTable("product_categories")
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
    this.drop("product_product_categories");
  }
}

module.exports = ProductProductCategorySchema;
