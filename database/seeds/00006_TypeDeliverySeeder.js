"use strict";

/*
|--------------------------------------------------------------------------
| TypeDeliverySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const DeliveryType = use("App/Models/DeliveryType");

class TypeDeliverySeeder {
  async run() {
    await DeliveryType.createMany([
      { name: "Normal", price: 0.0 },
      { name: "Prime", price: 2.5 },
      { name: "Super", price: 10.0 }
    ]);
  }
}

module.exports = TypeDeliverySeeder;
