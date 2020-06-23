"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentUserSchema extends Schema {
  up() {
    this.create("establishment_users", (table) => {
      table.increments();
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("establishment_users");
  }
}

module.exports = EstablishmentUserSchema;
