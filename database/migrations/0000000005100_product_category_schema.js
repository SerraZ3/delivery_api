"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductCategorySchema extends Schema {
  up() {
    this.create("product_categories", (table) => {
      table.increments();
      table.string("name");
      table.string("description", 255);
      table.timestamps();
    });
  }

  down() {
    this.drop("product_categories");
  }
}

module.exports = ProductCategorySchema;
