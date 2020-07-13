"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderEstablishmentSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("establishment_id");
    });
  }
}

module.exports = OrderEstablishmentSchema;
