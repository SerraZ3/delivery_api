"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductCategoryImageSchema extends Schema {
  up() {
    this.create("product_category_images", (table) => {
      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onDelete("CASCADE");
      table
        .integer("product_category_id")
        .unsigned()
        .references("id")
        .inTable("product_categories")
        .onDelete("CASCADE");
      table.boolean("main").default(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("product_category_images");
  }
}

module.exports = ProductCategoryImageSchema;
