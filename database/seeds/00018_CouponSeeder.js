"use strict";

/*
|--------------------------------------------------------------------------
| CouponSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class CouponSeeder {
  async run() {
    let coupons = await Factory.model("App/Models/Coupon").createMany(10);
    await Promise.all(
      await coupons.map(async (coupon, idx) => {
        await coupon.orders().attach([idx + 1]);
        await coupon.products().attach([idx + 1]);
        await coupon.productCategories().attach([idx + 1]);
        await coupon.users().attach([idx + 1]);
      })
    );
  }
}

module.exports = CouponSeeder;
