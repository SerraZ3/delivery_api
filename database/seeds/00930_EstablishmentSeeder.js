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
const User = use("App/Models/User");

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

    let userAdmin = await User.findBy("email", "serra.henrique3@gmail.com");
    let userManager = await User.findBy("email", "serra.henrique1@gmail.com");
    let deliveryman = await User.findBy("email", "luiz1@gmail.com");

    await establishment
      .users()
      .attach([userAdmin.id, userManager.id, deliveryman.id]);

    await (await EstablishmentUser.findBy("user_id", userAdmin.id))
      .roles()
      .attach([1]);
    await (await EstablishmentUser.findBy("user_id", userManager.id))
      .roles()
      .attach([2]);
    await (await EstablishmentUser.findBy("user_id", deliveryman.id))
      .roles()
      .attach([4]);
    let menu = await Factory.model("App/Models/Image").create({
      path: "1594610428309-s2wE2RYImlf92Lrgrmz63LYDWZl6ga.jpeg"
    });
    let wallpaper = await Factory.model("App/Models/Image").create({
      path: "1594610440196-L9Rk6bX74DeN3NMDg45PwsifxMaYVp.jpeg"
    });

    await establishment.images().attach(menu.id, (row) => {
      row.menu = true;
    });
    await establishment.images().attach(wallpaper.id, (row) => {
      row.wallpaper = true;
    });
  }
}

module.exports = EstablishmentSeeder;
