"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderProductProductSchema extends Schema {
  up() {
    this.table("order_products", (table) => {
      // alter table
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("order_products", (table) => {
      // reverse alternations
      table.dropForeign("product_id");
    });
  }
}

module.exports = OrderProductProductSchema;
