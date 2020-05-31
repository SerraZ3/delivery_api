"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CityStateSchema extends Schema {
  up() {
    this.table("cities", (table) => {
      // alter table
      table
        .foreign("state_id")
        .references("id")
        .inTable("states")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("cities", (table) => {
      // reverse alternations
      table.dropForeign("state_id");
    });
  }
}

module.exports = CityStateSchema;
