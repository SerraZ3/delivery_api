"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DiscountApplicationSchema extends Schema {
  up() {
    this.create("discount_applications", (table) => {
      table.increments();
      table.string("name");
      table.string("slug");
      table.timestamps();
    });
  }

  down() {
    this.drop("discount_applications");
  }
}

module.exports = DiscountApplicationSchema;
