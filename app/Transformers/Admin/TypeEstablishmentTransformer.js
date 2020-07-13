"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * TypeEstablishmentTransformer class
 *
 * @class TypeEstablishmentTransformer
 * @constructor
 */
class TypeEstablishmentTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((establishment) => {
        return {
          id: establishment.id,
          name: establishment.name,
          slug: establishment.slug
        };
      });
    } else if (model.length === 0) {
      return [];
    } else {
      return {
        id: model.id,
        name: model.name,
        slug: model.slug
      };
    }
  };
  transformWithTimestamp = (model) => {
    if (model.length > 0) {
      return model.map((establishment) => {
        return {
          id: establishment.id,
          name: establishment.name,
          slug: establishment.slug,
          created_at: establishment.created_at,
          updated_at: establishment.updated_at
        };
      });
    } else if (model.length === 0) {
      return [];
    } else {
      return {
        id: model.id,
        name: model.name,
        slug: model.slug,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  };
}

module.exports = TypeEstablishmentTransformer;
