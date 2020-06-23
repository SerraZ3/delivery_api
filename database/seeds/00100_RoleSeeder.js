"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Role = use("Role");

class RoleSeeder {
  async run() {
    // Cria o cargo de administrador
    await Role.create({
      name: "Admin",
      slug: "admin",
      description: "Administrador do sistema"
    });
    // Cria o cargo de gerente
    await Role.create({
      name: "Manager",
      slug: "manager",
      description: "Gerente do Sistema"
    });
    // Cria o cargo de cliente
    await Role.create({
      name: "Client",
      slug: "client",
      description: "Cliente do Sistema"
    });
    // Cria o cargo de Entregador
    await Role.create({
      name: "Deliveryman",
      slug: "deliveryman",
      description: "Entregador"
    });
  }
}

module.exports = RoleSeeder;
