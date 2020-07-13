"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentProductCategorySchema extends Schema {
  up() {
    this.table("product_categories", (table) => {
      // alter table
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("product_categories", (table) => {
      // reverse alternations
      table.dropForeign("establishment_id");
    });
  }
}

module.exports = EstablishmentProductCategorySchema;
