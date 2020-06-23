"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonPhoneSchema extends Schema {
  up() {
    this.table("people", (table) => {
      // alter table
      table
        .integer("phone_id")
        .unsigned()
        .references("id")
        .inTable("phones")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("people", (table) => {
      // reverse alternations
      table.dropForeign("phone_id");
    });
  }
}

module.exports = PersonPhoneSchema;
