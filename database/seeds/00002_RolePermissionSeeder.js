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
      name: "Create Admin Users",
      slug: "create_admin_users",
      description: "Create admin users permission"
    });
    // Permissão de visualizar usuário administrador
    await Permission.create({
      name: "Read Admin Users",
      slug: "read_admin_users",
      description: "Read admin users permission"
    });
    // Permissão de atualizar usuário administrador
    await Permission.create({
      name: "Update Admin Users",
      slug: "update_admin_users",
      description: "Update admin users permission"
    });
    // Permissão de deletar usuário administrador
    await Permission.create({
      name: "Delete Admin Users",
      slug: "delete_admin_users",
      description: "Delete admin users permission"
    });

    // ============================
    //  Permissões de CRUD pedidos
    // ============================

    // 1- So quem pode criar pedidos são clientes
    // 2- É impossivel deletar pedidos por conta do histórico

    // Permissão de atualizar pedidos
    await Permission.create({
      name: "Update Order",
      slug: "update_order",
      description: "Update Order permission"
    });
    // Permissão de visualizar pedidos
    await Permission.create({
      name: "Read Order",
      slug: "read_order",
      description: "Read Order permission"
    });

    // ==========================================
    //  Permissões de CRUD produtos e categorias
    // ==========================================

    // Uma pessoa que pode manipular produtos pode manipular sua categorias

    // Permissão de criar produtos e categorias
    await Permission.create({
      name: "Create Product",
      slug: "create_product",
      description: "Create product permission"
    });
    // Permissão de visualizar produtos e categorias
    await Permission.create({
      name: "Read Product",
      slug: "read_product",
      description: "Read product permission"
    });
    // Permissão de atualizar produtos e categorias
    await Permission.create({
      name: "Update Product",
      slug: "update_product",
      description: "Update product permission"
    });
    // Permissão de deletar produtos e categorias
    await Permission.create({
      name: "Delete Product",
      slug: "delete_product",
      description: "Delete product permission"
    });

    // ==========================================
    //  Permissões de visualizar estatisticas
    // ==========================================

    // Estatisticas só podem ser visualizadas

    // Permissão de visualizar estatísticas
    await Permission.create({
      name: "Read Statistic",
      slug: "read_statistic",
      description: "Read statistic permission"
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
      name: "Create Discount",
      slug: "create_discount",
      description: "Create discount permission"
    });
    // Permissão de visualizar cupons e cartão fidelidade
    await Permission.create({
      name: "Read Discount",
      slug: "read_discount",
      description: "Read discount permission"
    });
    // Permissão de atualizar cupons e cartão fidelidade
    await Permission.create({
      name: "Update Discount",
      slug: "update_discount",
      description: "Update discount permission"
    });
    // Permissão de deletar cupons e cartão fidelidade
    await Permission.create({
      name: "Delete Discount",
      slug: "delete_discount",
      description: "Delete discount permission"
    });

    // ==============================
    //  Permissões de CRUD entregadores
    // ==============================

    // Permissão de criar entregadores
    await Permission.create({
      name: "Create Deliveryman",
      slug: "create_deliveryman",
      description: "Create deliveryman permission"
    });
    // Permissão de visualizar entregadores
    await Permission.create({
      name: "Read Deliveryman",
      slug: "read_deliveryman",
      description: "Read deliveryman permission"
    });
    // Permissão de atualizar entregadores
    await Permission.create({
      name: "Update Deliveryman",
      slug: "update_deliveryman",
      description: "Update deliveryman permission"
    });
    // Permissão de deletar entregadores
    await Permission.create({
      name: "Delete Deliveryman",
      slug: "delete_deliveryman",
      description: "Delete deliveryman permission"
    });
  }
}

module.exports = RolePermissionSeeder;
