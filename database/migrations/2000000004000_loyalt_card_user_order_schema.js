"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltCardUserOrderSchema extends Schema {
  up() {
    this.create("loyalt_card_user_orders", (table) => {
      table
        .integer("loyalt_card_user_id")
        .unsigned()
        .references("id")
        .inTable("loyalt_card_users")
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
    this.drop("loyalt_card_user_orders");
  }
}

module.exports = LoyaltCardUserOrderSchema;
