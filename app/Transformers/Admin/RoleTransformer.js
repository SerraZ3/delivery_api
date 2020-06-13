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
  transform = (model) => {
    if (model.length > 0) {
      return model.map((role) => {
        return {
          id: role.id,
          name: role.name,
          slug: role.slug
        };
      });
    } else {
      return {
        // add your transformation object here

        id: model.id,
        name: model.name,
        slug: model.slug
      };
    }
  };

  transformWithTimestamp = (model) => {
    if (model.length > 0) {
      return model.map((role) => {
        return {
          id: role.id,
          name: role.name,
          slug: role.slug,
          created_at: role.created_at,
          updated_at: role.updated_at
        };
      });
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
  };

  includePermissions = (model) =>
    this.item(model.getRelated("permissions"), PermissionTransformer);
}

module.exports = RoleTransformer;
