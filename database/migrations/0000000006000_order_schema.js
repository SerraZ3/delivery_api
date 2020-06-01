"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", (table) => {
      table.increments();
      table.integer("order_status_id").unsigned();
      table.integer("user_id").unsigned();
      table.integer("deliveryman_id").unsigned();
      table.integer("address_id").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
