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
    let products = await Factory.model("App/Models/Product").createMany(20);

    await Promise.all(
      await products.map(async (product, idx) => {
        await product.images().attach([idx + 1, idx + 2]);
      })
    );
  }
}

module.exports = ProductSeeder;
