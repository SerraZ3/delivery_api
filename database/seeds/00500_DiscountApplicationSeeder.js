"use strict";

/*
|--------------------------------------------------------------------------
| DiscountApplicationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const DiscountApplication = use("App/Models/DiscountApplication");

class DiscountApplicationSeeder {
  async run() {
    await DiscountApplication.createMany([
      { name: "Categoria", slug: "category" },
      { name: "Produto", slug: "product" },
      { name: "Cliente", slug: "client" },
      { name: "Categoria e Produto", slug: "category_product" },
      { name: "Categoria e Cliente", slug: "category_client" },
      { name: "Produto e Cliente", slug: "product_client" },
      { name: "Categoria, Produto e Cliente", slug: "category_product_client" }
    ]);
  }
}

module.exports = DiscountApplicationSeeder;
