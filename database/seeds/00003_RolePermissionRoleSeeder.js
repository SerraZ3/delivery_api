"use strict";

/*
|--------------------------------------------------------------------------
| RolePermissionRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Role = use("Role");

class RolePermissionRoleSeeder {
  async run() {
    let roleAdmin = await Role.find(1);
    await roleAdmin.permissions().attach([
      1, // Create Admin Users
      2, // Read Admin Users
      3, // Update Admin Users
      4, // Delete Admin Users
      5, // Update Order
      6, // Read Order
      7, // Create Product
      8, // Read Product
      9, // Update Product
      10, // Delete Product
      11, // Read Statistic
      12, // Create Discount
      13, // Read Discount
      14, // Update Discount
      15, // Delete Discount
      16, // Create Deliveryman
      17, // Read Deliveryman
      18, // Update Deliveryman
      19 // Delete Deliveryman
    ]);
  }
}

module.exports = RolePermissionRoleSeeder;
