"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderDeliveryTypeSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .integer("delivery_type_id")
        .unsigned()
        .references("id")
        .inTable("delivery_types")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("delivery_type_id");
    });
  }
}

module.exports = OrderDeliveryTypeSchema;
