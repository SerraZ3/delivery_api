"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeolocationSchema extends Schema {
  up() {
    this.create("geolocations", (table) => {
      table.increments();
      table.decimal("latitude", 10, 7).notNullable();
      table.decimal("longitude", 10, 7).notNullable();
      table.decimal("radius", 10, 7).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("geolocations");
  }
}

module.exports = GeolocationSchema;
