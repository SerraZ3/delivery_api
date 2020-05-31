"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonAddressSchema extends Schema {
  up() {
    this.table("people", (table) => {
      // alter table
      table
        .foreign("address_id")
        .references("id")
        .inTable("users")
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
