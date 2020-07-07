"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductImageSchema extends Schema {
  up() {
    this.create("product_images", (table) => {
      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.boolean("main").default(0);

      table.timestamps();
    });
  }

  down() {
    this.drop("product_images");
  }
}

module.exports = ProductImageSchema;
