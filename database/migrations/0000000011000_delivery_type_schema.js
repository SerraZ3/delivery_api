"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeliveryTypeSchema extends Schema {
  up() {
    this.create("delivery_types", (table) => {
      table.increments();
      table.string("name");
      table.decimal("price", 3, 2);
      table.timestamps();
    });
  }

  down() {
    this.drop("delivery_types");
  }
}

module.exports = DeliveryTypeSchema;
