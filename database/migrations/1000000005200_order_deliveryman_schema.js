"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderDeliverymanSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .integer("person_id")
        .unsigned()
        .references("id")
        .inTable("people")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("person_id");
    });
  }
}

module.exports = OrderDeliverymanSchema;
