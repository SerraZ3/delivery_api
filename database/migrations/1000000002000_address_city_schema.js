"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressCitySchema extends Schema {
  up() {
    this.table("addresses", (table) => {
      // alter table
      table
        .foreign("city_id")
        .references("id")
        .inTable("cities")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("addresses", (table) => {
      // reverse alternations
      table.dropForeign("city_id");
    });
  }
}

module.exports = AddressCitySchema;
