"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressGeolocationSchema extends Schema {
  up() {
    this.table("addresses", (table) => {
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
    this.table("addresses", (table) => {
      // reverse alternations
      table.dropForeign("geolocation_id");
    });
  }
}

module.exports = AddressGeolocationSchema;
