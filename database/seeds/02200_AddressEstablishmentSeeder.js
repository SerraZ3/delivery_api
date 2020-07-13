"use strict";

/*
|--------------------------------------------------------------------------
| AddressEstablishmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Establishment = use("App/Models/Establishment");

class AddressEstablishmentSeeder {
  async run() {
    let establishment = await Establishment.find(1);
    await establishment.addresses().attach(1);
    let establishment2 = await Establishment.find(2);
    await establishment2.addresses().attach(2);
  }
}

module.exports = AddressEstablishmentSeeder;
