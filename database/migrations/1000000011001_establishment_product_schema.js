"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentProductSchema extends Schema {
  up() {
    this.table("products", (table) => {
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
    this.table("products", (table) => {
      // reverse alternations
      table.dropForeign("establishment_id");
    });
  }
}

module.exports = EstablishmentProductSchema;
