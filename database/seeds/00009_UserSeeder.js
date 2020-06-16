"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    // Cria 10 usuários
    let clients = await Factory.model("App/Models/User").createMany(10);

    // Vincula a regra de cliente para os 10 usuários
    await Promise.all(
      await clients.map(async (client) => {
        await client.roles().attach([3]);
      })
    );

    // Cria 10 usuários
    let deliverymen = await Factory.model("App/Models/User").createMany(3);

    // Vincula a regra de deliveryman para os 10 usuários
    await Promise.all(
      await deliverymen.map(async (client) => {
        await client.roles().attach([4]);
      })
    );

    // Cria 1 usuário admin
    let admin = await Factory.model("App/Models/User").create({
      email: "serra.henrique3@gmail.com",
      active: true
    });

    // Vicula a regra de administrador e cliente a esse usuário
    await admin.roles().attach([1, 3]);

    // Cria 1 usuário admin
    let manager = await Factory.model("App/Models/User").create({
      email: "serra.henrique1@gmail.com",
      active: true
    });

    // Vicula a regra de administrador e cliente a esse usuário
    await manager.roles().attach([2, 3]);
    await manager.permissions().attach([1, 2, 3, 4, 5, 6]);
  }
}

module.exports = UserSeeder;
