"use strict";

/*
|--------------------------------------------------------------------------
| PersonSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class PersonSeeder {
  async run() {
    let people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    await Promise.all(
      await people.map(async (num) => {
        await Factory.model("App/Models/Person").create({
          user_id: num,
          address_id: num
        });
      })
    );
    await Factory.model("App/Models/Person").create({
      user_id: 16,
      address_id: 16,
      name: "Luiz Ricardo Silva",
      cpf: "12312312312"
    });
  }
}

module.exports = PersonSeeder;
