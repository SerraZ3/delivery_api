"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponOrderSchema extends Schema {
  up() {
    this.create("coupon_orders", (table) => {
      table
        .integer("coupon_id")
        .unsigned()
        .references("id")
        .inTable("coupons")
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
    this.drop("coupon_orders");
  }
}

module.exports = CouponOrderSchema;
