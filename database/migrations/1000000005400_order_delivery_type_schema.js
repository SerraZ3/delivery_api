"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderDeliveryTypeSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .foreign("delivery_type_id")
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
