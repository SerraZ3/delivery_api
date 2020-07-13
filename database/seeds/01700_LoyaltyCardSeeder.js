"use strict";

/*
|--------------------------------------------------------------------------
| LoyaltyCardSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class LoyaltyCardSeeder {
  async run() {
    let loyaltyCards = await Factory.model("App/Models/LoyaltyCard").createMany(
      20
    );

    await Promise.all(
      await loyaltyCards.map(async (loyaltyCard, idx) => {
        await loyaltyCard.products().attach([idx + 1]);
        await loyaltyCard.productCategories().attach([idx + 1]);
      })
    );
  }
}

module.exports = LoyaltyCardSeeder;
