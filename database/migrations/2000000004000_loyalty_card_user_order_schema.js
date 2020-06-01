"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltyCardUserOrderSchema extends Schema {
  up() {
    this.create("loyalty_card_user_orders", (table) => {
      table
        .integer("loyalty_card_user_id")
        .unsigned()
        .references("id")
        .inTable("loyalty_card_users")
        .onDelete("CASCADE");
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("loyalty_card_user_orders");
  }
}

module.exports = LoyaltyCardUserOrderSchema;
