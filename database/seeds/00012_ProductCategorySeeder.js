"use strict";

/*
|--------------------------------------------------------------------------
| ProductCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProductCategorySeeder {
  async run() {
    // Mais procurados
    await Factory.model("App/Models/ProductCategory").create({
      name: "Mais procurados",
      description: "Os produtos que vocês gostam mais!"
    });
    // Pizzas
    await Factory.model("App/Models/ProductCategory").create({
      name: "Pizzas",
      description: "Encontre as melhores pizzas da região!"
    });
    // bebidas
    await Factory.model("App/Models/ProductCategory").create({
      name: "Bebidas",
      description: "Com sede? Que tal uma bebida para acompanhar seu pedidos?!"
    });
    // Sobremesa
    await Factory.model("App/Models/ProductCategory").create({
      name: "Sobremesa",
      description: "A melhor parte da refeição sempre é a sobremesa!"
    });

    let productCategories = await Factory.model(
      "App/Models/ProductCategory"
    ).createMany(20);

    await Promise.all(
      await productCategories.map(async (productCategory, idx) => {
        await productCategory.images().attach([idx + 1, idx + 2]);
      })
    );
  }
}

module.exports = ProductCategorySeeder;
