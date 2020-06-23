"use strict";

/*
|--------------------------------------------------------------------------
| EstablishmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const EstablishmentUser = use("App/Models/EstablishmentUser");

class EstablishmentSeeder {
  async run() {
    const phone = await Factory.model("App/Models/Phone").create();

    const establishment = await Factory.model(
      "App/Models/Establishment"
    ).create({
      name: "Pizzaria",
      description: "A pizzaria da familia",
      phone: phone.id
    });

    await establishment.users().attach([1, 2, 3]);
  }
}

module.exports = EstablishmentSeeder;
