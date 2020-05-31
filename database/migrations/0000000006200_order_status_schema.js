"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderStatusSchema extends Schema {
  up() {
    this.create("order_statuses", (table) => {
      table.increments();
      table.string("name");
      table.string("slug", 5);
      table.timestamps();
    });
  }

  down() {
    this.drop("order_statuses");
  }
}

module.exports = OrderStatusSchema;