"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonUserSchema extends Schema {
  up() {
    this.table("people", (table) => {
      // alter table
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("people", (table) => {
      // reverse alternations
      table.dropForeign("user_id");
    });
  }
}

module.exports = PersonUserSchema;
