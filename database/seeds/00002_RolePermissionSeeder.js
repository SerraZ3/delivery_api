"use strict";

/*
|--------------------------------------------------------------------------
| RolePermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Permission = use("Permission");

class RolePermissionSeeder {
  async run() {
    // ===========================================
    //  Permissões de CRUD usuário administrativo
    // ===========================================

    // Permissão de criar usuário administrador
    await Permission.create({
      name: "Create Users",
      slug: "create_users",
      description: "Create users permission"
    });
    // Permissão de visualizar usuário administrador
    await Permission.create({
      name: "Read Users",
      slug: "read_users",
      description: "Read users permission"
    });
    // Permissão de atualizar usuário administrador
    await Permission.create({
      name: "Update Users",
      slug: "update_users",
      description: "Update users permission"
    });
    // Permissão de deletar usuário administrador
    await Permission.create({
      name: "Delete Users",
      slug: "delete_users",
      description: "Delete users permission"
    });

    // ============================
    //  Permissões de CRUD pedidos
    // ============================

    // 1- So quem pode criar pedidos são clientes
    // 2- É impossivel deletar pedidos por conta do histórico

    // Permissão de atualizar pedidos
    await Permission.create({
      name: "Update Orders",
      slug: "update_orders",
      description: "Update Orders permission"
    });
    // Permissão de visualizar pedidos
    await Permission.create({
      name: "Read Orders",
      slug: "read_orders",
      description: "Read Orders permission"
    });

    // ==========================================
    //  Permissões de CRUD produtos e categorias
    // ==========================================

    // Uma pessoa que pode manipular produtos pode manipular sua categorias

    // Permissão de criar produtos e categorias
    await Permission.create({
      name: "Create Products",
      slug: "create_products",
      description: "Create products permission"
    });
    // Permissão de visualizar produtos e categorias
    await Permission.create({
      name: "Read Products",
      slug: "read_products",
      description: "Read products permission"
    });
    // Permissão de atualizar produtos e categorias
    await Permission.create({
      name: "Update Products",
      slug: "update_products",
      description: "Update products permission"
    });
    // Permissão de deletar produtos e categorias
    await Permission.create({
      name: "Delete Products",
      slug: "delete_products",
      description: "Delete products permission"
    });

    // ==========================================
    //  Permissões de visualizar estatisticas
    // ==========================================

    // Estatisticas só podem ser visualizadas

    // Permissão de visualizar estatísticas
    await Permission.create({
      name: "Read Statistics",
      slug: "read_statistics",
      description: "Read statistics permission"
    });

    // ==============================
    //  Permissões de CRUD descontos
    // ==============================

    /**
     *
     *  Desconto é composto por:
     * - Cartão fidelidade
     * - Cupom de desconto
     *
     * */

    // Permissão de criar cupons e cartão fidelidade
    await Permission.create({
      name: "Create Discounts",
      slug: "create_discounts",
      description: "Create discounts permission"
    });
    // Permissão de visualizar cupons e cartão fidelidade
    await Permission.create({
      name: "Read Discounts",
      slug: "read_discounts",
      description: "Read discounts permission"
    });
    // Permissão de atualizar cupons e cartão fidelidade
    await Permission.create({
      name: "Update Discounts",
      slug: "update_discounts",
      description: "Update discounts permission"
    });
    // Permissão de deletar cupons e cartão fidelidade
    await Permission.create({
      name: "Delete Discounts",
      slug: "delete_discounts",
      description: "Delete discounts permission"
    });

    // ==============================
    //  Permissões de CRUD entregadores
    // ==============================

    // Permissão de criar entregadores
    await Permission.create({
      name: "Create Deliverymen",
      slug: "create_deliverymen",
      description: "Create deliverymen permission"
    });
    // Permissão de visualizar entregadores
    await Permission.create({
      name: "Read Deliverymen",
      slug: "read_deliverymen",
      description: "Read deliverymen permission"
    });
    // Permissão de atualizar entregadores
    await Permission.create({
      name: "Update Deliverymen",
      slug: "update_deliverymen",
      description: "Update deliverymen permission"
    });
    // Permissão de deletar entregadores
    await Permission.create({
      name: "Delete Deliverymen",
      slug: "delete_deliverymen",
      description: "Delete deliverymen permission"
    });
  }
}

module.exports = RolePermissionSeeder;
