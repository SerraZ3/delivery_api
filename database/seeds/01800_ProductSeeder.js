"use strict";

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProductSeeder {
  async run() {
    await Factory.model("App/Models/Product").createMany();
    let pizza1 = await Factory.model("App/Models/Product").create({
      name: "4 Queijos",
      price: 21.4,
      description:
        "Pizza com mozzarela, provolone, gorgonzola e prato. Disponível em tamanho médio (6 fatias) e grande (12 fatias)"
    });
    await pizza1.images().attach([1]);
    await pizza1.productCategories().attach([1, 2]);

    let pizza2 = await Factory.model("App/Models/Product").create({
      name: "Calabreza",
      price: 22.4,
      description:
        "Pizza sabor calabreza. Disponível em tamanho médio (6 fatias) e grande (12 fatias)"
    });
    await pizza2.images().attach([2]);
    await pizza2.productCategories().attach([1, 2]);

    let pizza3 = await Factory.model("App/Models/Product").create({
      name: "Mozzarela",
      price: 23.4,
      description:
        "Pizza sabor Mozzarela. Disponível em tamanho médio (6 fatias) e grande (12 fatias)"
    });
    await pizza3.images().attach([3]);
    await pizza3.productCategories().attach([2]);

    let pizza4 = await Factory.model("App/Models/Product").create({
      name: "Portuguesa",
      price: 25.4,
      description:
        "Pizza com calabreza, cebola, tomate, queijo e azeitona. Disponível em tamanho médio (6 fatias) e grande (12 fatias)"
    });
    await pizza4.images().attach([4]);
    await pizza4.productCategories().attach([2]);

    let pizza5 = await Factory.model("App/Models/Product").create({
      name: "Tradicional",
      price: 21.4,
      description:
        "Pizza com calabreza, cebola, tomate, queijo e azeitona. Disponível em tamanho médio (6 fatias) e grande (12 fatias)"
    });
    await pizza5.images().attach([5]);
    await pizza5.productCategories().attach([2]);

    let refri1 = await Factory.model("App/Models/Product").create({
      name: "Guaraná 2L",
      price: 5.5,
      description: " "
    });
    await refri1.images().attach([6]);
    await refri1.productCategories().attach([3]);

    let refri2 = await Factory.model("App/Models/Product").create({
      name: "Coca-cola 2L",
      price: 6.5,
      description: " "
    });
    await refri2.images().attach([7]);
    await refri2.productCategories().attach([1, 3]);

    let refri3 = await Factory.model("App/Models/Product").create({
      name: "Fanta 2L",
      price: 7.5,
      description: " "
    });
    await refri3.images().attach([8]);
    await refri3.productCategories().attach([3]);

    let refri4 = await Factory.model("App/Models/Product").create({
      name: "Dole 2L",
      price: 2.5,
      description: " "
    });
    await refri4.images().attach([9]);
    await refri4.productCategories().attach([3]);

    let doce1 = await Factory.model("App/Models/Product").create({
      name: "Pudim",
      price: 10.5,
      description: " "
    });
    await doce1.images().attach([10]);
    await doce1.productCategories().attach([4]);

    let doce2 = await Factory.model("App/Models/Product").create({
      name: "Bolo de chocolate",
      price: 20.5,
      description: " "
    });
    await doce2.images().attach([11]);
    await doce2.productCategories().attach([1, 4]);

    let doce3 = await Factory.model("App/Models/Product").create({
      name: "Bombom",
      price: 2.5,
      description: " "
    });
    await doce3.images().attach([12]);
    await doce3.productCategories().attach([1, 4]);

    let products = await Factory.model("App/Models/Product").createMany(20);

    await Promise.all(
      await products.map(async (product, idx) => {
        await product.images().attach([idx + 1, idx + 2]);
        await product.productCategories().attach([5 + 1]);
      })
    );
  }
}

module.exports = ProductSeeder;
