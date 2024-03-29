"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StateCountrySchema extends Schema {
  up() {
    this.table("states", (table) => {
      // alter table
      table
        .integer("country_id")
        .unsigned()
        .references("id")
        .inTable("countries")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("states", (table) => {
      // reverse alternations
      table.dropForeign("country_id");
    });
  }
}

module.exports = StateCountrySchema;
