"use strict";

/*
|--------------------------------------------------------------------------
| OrderProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class OrderProductSeeder {
  async run() {
    await Factory.model("App/Models/OrderProduct").createMany(30);
  }
}

module.exports = OrderProductSeeder;
