"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table.string("street", 200);
      table.string("neightborhood", 200);
      table.string("zip_code", 100);
      table.string("number", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
