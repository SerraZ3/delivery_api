"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const PermissionTransformer = use(
  "App/Transformers/Admin/PermissionTransformer"
);

/**
 * RoleTransformer class
 *
 * @class RoleTransformer
 * @constructor
 */
class RoleTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ["permissions"];
  }
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    if (model.length > 0) {
      let data = [];
      model.map((val, idx) => {
        data.push({
          id: model[idx].id,
          name: model[idx].name,
          slug: model[idx].slug
        });
      });
      return data;
    } else {
      return {
        // add your transformation object here

        id: model.id,
        name: model.name,
        slug: model.slug
      };
    }
  }
  transformWithTimestamp(model) {
    if (model.length > 0) {
      let data = [];
      model.map((val, idx) => {
        data.push({
          id: model[idx].id,
          name: model[idx].name,
          slug: model[idx].slug,
          created_at: model[idx].created_at,
          updated_at: model[idx].updated_at
        });
      });
      return data;
    } else {
      return {
        // add your transformation object here

        id: model.id,
        name: model.name,
        slug: model.slug,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  }
  includePermissions(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("permissions"), PermissionTransformer);
  }
}

module.exports = RoleTransformer;
