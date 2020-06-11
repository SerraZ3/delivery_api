"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const PersonTransformer = use("App/Transformers/Admin/PersonTransformer");
const RoleTransformer = use("App/Transformers/Admin/RoleTransformer");
const PermissionTransformer = use(
  "App/Transformers/Admin/PermissionTransformer"
);

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ["person", "roles", "permissions"];
  }
  /**
   * This method is used to transform the default data.
   */
  transform(model) {
    return {
      id: model.id,
      email: model.email
    };
  }
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp(model) {
    return {
      id: model.id,
      email: model.email,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
  /**
   * This method is used to transform the data.
   */
  transformComplete(model) {
    return {
      // add your transformation object here
      id: model.id,
      email: model.email,
      active: model.active,
      name: model.name,
      cpf: model.cpf,
      date_birth: model.date_birth
    };
  }
  /**
   * This method is used to transform the data.
   */
  transformCompleteWithTimestamp(model) {
    return {
      // add your transformation object here
      id: model.id,
      email: model.email,
      active: model.active,
      name: model.name,
      cpf: model.cpf,
      date_birth: model.date_birth,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
  includePerson(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("person"), PersonTransformer);
  }
  includeRoles(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("roles"), RoleTransformer);
  }
  includePermissions(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("permissions"), PermissionTransformer);
  }
}

module.exports = UserTransformer;
