"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentImageSchema extends Schema {
  up() {
    this.create("establishment_image", (table) => {
      table.increments();
      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onDelete("CASCADE");
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onDelete("CASCADE");
      table.boolean("main").default(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("establishment_image");
  }
}

module.exports = EstablishmentImageSchema;
