"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonUserSchema extends Schema {
  up() {
    this.table("people", (table) => {
      // alter table
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("people", (table) => {
      // reverse alternations
      table.dropForeign("image_user_idid");
    });
  }
}

module.exports = PersonUserSchema;
