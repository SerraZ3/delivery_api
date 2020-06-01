"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponProductCategorySchema extends Schema {
  up() {
    this.create("coupon_product_categories", (table) => {
      table
        .integer("coupon_id")
        .unsigned()
        .references("id")
        .inTable("coupons")
        .onDelete("CASCADE");
      table
        .integer("product_category_id")
        .unsigned()
        .references("id")
        .inTable("product_categories")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("coupon_product_categories");
  }
}

module.exports = CouponProductCategorySchema;
