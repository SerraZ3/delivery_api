"use strict";

/*
|--------------------------------------------------------------------------
| OrderStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const OrderStatus = use("App/Models/OrderStatus");

class OrderStatusSeeder {
  async run() {
    await OrderStatus.createMany([
      { name: "Pendente", slug: "pendente", color: "#606060" },
      { name: "Cancelado", slug: "cancelado", color: "#FC0000" },
      { name: "Enviado", slug: "enviado", color: "#FC7200" },
      { name: "Pago", slug: "pago", color: "#00C900" },
      { name: "Finalizado", slug: "finalizado", color: "#202020" }
    ]);
  }
}

module.exports = OrderStatusSeeder;
