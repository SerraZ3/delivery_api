"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentSchema extends Schema {
  up() {
    this.create("establishments", (table) => {
      table.increments();
      table.string("name", 200);
      table.string("description", 200);
      table.timestamps();
    });
  }

  down() {
    this.drop("establishments");
  }
}

module.exports = EstablishmentSchema;
