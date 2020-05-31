"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoyaltCardSchema extends Schema {
  up() {
    this.create("loyalt_cards", (table) => {
      table.increments();
      table.string("code", 100).notNullable();
      table.decimal("quantity", 12, 2).notNullable();
      table.enum("type", ["percent", "cash"]).default("percent");

      // Se o cupom pode ser aplicado com outros cupons
      table.boolean("recursive").default(0);
      // Se o cupom pode ser usado ou não
      table.boolean("active").default(0);
      // Pode aplicar o cupom no valor total do pedido
      table.boolean("apply_total_order").default(0);

      table.timestamps();
    });
  }

  down() {
    this.drop("loyalt_cards");
  }
}

module.exports = LoyaltCardSchema;
