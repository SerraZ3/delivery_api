"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressEstablishmentSchema extends Schema {
  up() {
    this.create("address_establishment", (table) => {
      table.increments();
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onDelete("CASCADE");
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("address_establishment");
  }
}

module.exports = AddressEstablishmentSchema;
