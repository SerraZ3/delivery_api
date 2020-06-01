"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonAddressSchema extends Schema {
  up() {
    this.table("people", (table) => {
      // alter table
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("people", (table) => {
      // reverse alternations
      table.dropForeign("address_id");
    });
  }
}

module.exports = PersonAddressSchema;
