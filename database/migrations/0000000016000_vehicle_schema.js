"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VehicleSchema extends Schema {
  up() {
    this.create("vehicles", (table) => {
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("vehicles");
  }
}

module.exports = VehicleSchema;
