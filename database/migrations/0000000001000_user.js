"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60);
      table.string("avatar").nullable();
      table.string("username", 80).nullable();
      table.string("provider_id").nullable();
      table.string("provider").nullable();
      table.decimal("counter_loyalty_card", 3, 0).default(0);
      table.boolean("active").default(1);
      table.timestamp("email_verified_at").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
