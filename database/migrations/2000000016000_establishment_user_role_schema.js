"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentUserRoleSchema extends Schema {
  up() {
    this.create("establishment_user_role", (table) => {
      table.increments();
      table
        .integer("establishment_user_id")
        .unsigned()
        .references("id")
        .inTable("establishment_users")
        .onDelete("CASCADE");
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("establishment_user_role");
  }
}

module.exports = EstablishmentUserRoleSchema;
