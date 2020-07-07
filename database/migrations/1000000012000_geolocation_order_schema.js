"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeolocationOrderSchema extends Schema {
  up() {
    this.table("orders", (table) => {
      // alter table
      table
        .integer("geolocation_id")
        .unsigned()
        .references("id")
        .inTable("geolocations")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("orders", (table) => {
      // reverse alternations
      table.dropForeign("geolocation_id");
    });
  }
}

module.exports = GeolocationOrderSchema;
