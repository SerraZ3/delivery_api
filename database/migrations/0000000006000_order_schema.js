"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", (table) => {
      table.increments();
      table.decimal("amount_will_paid", 12, 2).default(null);
      table
        .enum("type_payment", ["credit_card", "debit_card", "cash"])
        .default("cash");
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
