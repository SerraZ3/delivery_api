"use strict";

/*
|--------------------------------------------------------------------------
| ImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ImageSeeder {
  async run() {
    await Factory.model("App/Models/Image").create({
      path: "1592878536707-0YQ2bJDEwm3h7UwnL4ChDdrhUJbcyH.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592878542941-bOZvwle3TeNicaR3bPgx4lQFwbJz3m.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592878558818-pSIFzs87RHppiWFXnvOIHA5TAXiVqi.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592878562880-CSTDUcqQvMkQvgYegcMYahEXKJkEyu.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592878566884-GvQ6w8srGoueob3x0RFxFciF2xrWQR.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592880784415-eeargcxpBQK5dH83f7MTpmyUvPx51D.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592880789732-ASLzaB2FYQrdrUGNIpWUy1dz95vNHH.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592880794138-lZ2qpMIWy3uaix4Q3uQbH7o6OolfOf.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592880798186-SvKnHOMaw3YMsaHocnL5ChgUJx3UeN.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592881271712-KlYMDWlZAAriQdNzztGaW9WL7WyAcC.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592881275227-3ZCot2WmwHW4zynwuLGsVfZh5CavZL.jpeg"
    });
    await Factory.model("App/Models/Image").create({
      path: "1592881279482-yPaXTx7hKy3WsmUPjuutqyyTltBrCz.jpeg"
    });

    await Factory.model("App/Models/Image").createMany(40);
  }
}

module.exports = ImageSeeder;
