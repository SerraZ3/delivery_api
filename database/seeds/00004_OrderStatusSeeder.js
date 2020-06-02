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
      { name: "Pendente", slug: "pendente" },
      { name: "Cancelado", slug: "cancelado" },
      { name: "Enviado", slug: "enviado" },
      { name: "Pago", slug: "pago" },
      { name: "Finalizado", slug: "finalizado" }
    ]);
  }
}

module.exports = OrderStatusSeeder;
