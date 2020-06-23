"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class EstablishmentUser extends Model {
  static boot() {
    super.boot();
  }
  static get traits() {
    return [
      "@provider:Adonis/Acl/HasRole",
      "@provider:Adonis/Acl/HasPermission"
    ];
  }
}

module.exports = EstablishmentUser;
