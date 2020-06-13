"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * PermissionTransformer class
 *
 * @class PermissionTransformer
 * @constructor
 */
class PermissionTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((permission) => {
        return {
          id: permission.id,
          name: permission.name,
          slug: permission.slug
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
      return model.map((permission, idx) => {
        return {
          id: permission.id,
          name: permission.name,
          slug: permission.slug,
          created_at: permission.created_at,
          updated_at: permission.updated_at
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
}

module.exports = PermissionTransformer;
