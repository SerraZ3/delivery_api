"use strict";

/*
|--------------------------------------------------------------------------
| AddressSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class AddressSeeder {
  async run() {
    // Cria 50 endereços
    await Factory.model("App/Models/Address").createMany(50);
  }
}

module.exports = AddressSeeder;
