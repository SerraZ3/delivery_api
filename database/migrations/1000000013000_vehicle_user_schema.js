"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VehicleUserSchema extends Schema {
  up() {
    this.table("vehicles", (table) => {
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
    this.table("vehicles", (table) => {
      // reverse alternations
      table.dropForeign("user_id");
    });
  }
}

module.exports = VehicleUserSchema;
