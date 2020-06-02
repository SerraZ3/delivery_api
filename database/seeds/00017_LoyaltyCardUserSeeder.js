"use strict";

/*
|--------------------------------------------------------------------------
| LoyaltyCardUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class LoyaltyCardUserSeeder {
  async run() {
    let loyaltyCardUsers = await Factory.model(
      "App/Models/LoyaltyCardUser"
    ).createMany(10);

    await Promise.all(
      await loyaltyCardUsers.map(async (loyaltyCardUser, idx) => {
        await loyaltyCardUser.orders().attach([idx + 1]);
      })
    );
  }
}

module.exports = LoyaltyCardUserSeeder;
