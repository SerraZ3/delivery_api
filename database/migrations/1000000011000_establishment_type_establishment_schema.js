"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentTypeEstablishmentSchema extends Schema {
  up() {
    this.table("establishments", (table) => {
      // alter table
      table
        .integer("type_establishment_id")
        .unsigned()
        .references("id")
        .inTable("type_establishments")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("establishments", (table) => {
      // reverse alternations
      table.dropForeign("type_establishment_id");
    });
  }
}

module.exports = EstablishmentTypeEstablishmentSchema;
