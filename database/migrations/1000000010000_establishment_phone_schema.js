"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentPhoneSchema extends Schema {
  up() {
    this.table("establishments", (table) => {
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
    this.table("establishments", (table) => {
      // reverse alternations
      table.dropForeign("phone_id");
    });
  }
}

module.exports = EstablishmentPhoneSchema;
