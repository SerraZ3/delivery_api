"use strict";

/*
|--------------------------------------------------------------------------
| TypeEstablishmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const TypeEstablishment = use("App/Models/TypeEstablishment");

class TypeEstablishmentSeeder {
  async run() {
    await TypeEstablishment.create({
      name: "Comida",
      slug: "food"
    });
  }
}

module.exports = TypeEstablishmentSeeder;
