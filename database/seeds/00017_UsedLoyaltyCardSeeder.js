"use strict";

/*
|--------------------------------------------------------------------------
| UsedLoyaltyCardSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UsedLoyaltyCardSeeder {
  async run() {
    await Factory.model("App/Models/UsedLoyaltyCard").createMany(12);
  }
}

module.exports = UsedLoyaltyCardSeeder;
