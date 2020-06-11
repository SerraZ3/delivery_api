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
  transform(model) {
    return {
      // add your transformation object here

      id: model.id,
      name: model.name,
      slug: model.slug
    };
  }
  transformWithTimestamp(model) {
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

module.exports = PermissionTransformer;
