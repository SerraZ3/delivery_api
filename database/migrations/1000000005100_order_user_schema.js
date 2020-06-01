"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderUserSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("user_id");
    });
  }
}

module.exports = OrderUserSchema;
