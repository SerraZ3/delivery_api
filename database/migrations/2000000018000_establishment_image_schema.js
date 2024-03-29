"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentImageSchema extends Schema {
  up() {
    this.create("establishment_images", (table) => {
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
      table.boolean("menu").default(0);
      table.boolean("wallpaper").default(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("establishment_images");
  }
}

module.exports = EstablishmentImageSchema;
