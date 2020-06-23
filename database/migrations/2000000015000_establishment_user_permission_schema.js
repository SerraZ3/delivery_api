"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstablishmentUserPermissionSchema extends Schema {
  up() {
    this.create("establishment_user_permission", (table) => {
      table.increments();
      table
        .integer("establishment_user_id")
        .unsigned()
        .references("id")
        .inTable("establishment_users")
        .onDelete("CASCADE");
      table
        .integer("permission_id")
        .unsigned()
        .references("id")
        .inTable("permissions")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("establishment_user_permission");
  }
}

module.exports = EstablishmentUserPermissionSchema;
