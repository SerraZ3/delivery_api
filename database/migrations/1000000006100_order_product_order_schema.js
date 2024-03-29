"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderProductOrderSchema extends Schema {
  up() {
    this.table("order_products", (table) => {
      // alter table
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("order_products", (table) => {
      // reverse alternations
      table.dropForeign("order_id");
    });
  }
}

module.exports = OrderProductOrderSchema;
