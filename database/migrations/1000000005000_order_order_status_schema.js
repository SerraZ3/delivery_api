"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderOrderStatusSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .integer("order_status_id")
        .unsigned()
        .references("id")
        .inTable("order_statuses")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("order_status_id");
    });
  }
}

module.exports = OrderOrderStatusSchema;
