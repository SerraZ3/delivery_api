"use strict";

/*
|--------------------------------------------------------------------------
| CityStateCountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import(@adonisjs/lucid/src/Factory')} */
const City = use("App/Models/City");
const Country = use("App/Models/Country");

const { countries } = use("App/Helpers/countries.json");
const { states, cities } = use("App/Helpers/states_cities.json");

class CityStateCountrySeeder {
  async run() {
    // Cria paises
    await Country.createMany(countries);

    // Encontra o brasil
    let brazil = await Country.find(33);

    // Vincula o pais aos estados
    await brazil.states().createMany(states);

    // Cria as cidades
    await City.createMany(cities);
  }
}

module.exports = CityStateCountrySeeder;
