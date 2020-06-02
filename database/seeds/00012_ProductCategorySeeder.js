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
