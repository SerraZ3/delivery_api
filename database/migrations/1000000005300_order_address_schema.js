"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderAddressSchema extends Schema {
  up() {
    this.table("orders", (table) => {
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
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("address_id");
    });
  }
}

module.exports = OrderAddressSchema;
