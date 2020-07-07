"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TypeEstablishmentSchema extends Schema {
  up() {
    this.create("type_establishments", (table) => {
      table.increments();
      table.string("name");
      table.string("slug");
      table.timestamps();
    });
  }

  down() {
    this.drop("type_establishments");
  }
}

module.exports = TypeEstablishmentSchema;
