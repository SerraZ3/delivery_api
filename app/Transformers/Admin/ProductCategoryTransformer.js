"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * ProductCategoryTransformer class
 *
 * @class ProductCategoryTransformer
 * @constructor
 */
class ProductCategoryTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((category) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description
        };
      });
    } else {
      return {
        // add your transformation object here
        id: model.id,
        name: model.name,
        description: model.description
      };
    }
  };

  transformWithTimestamp = (model) => {
    if (model.length > 0) {
      model.map((category) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description,
          created_at: category.created_at,
          updated_at: category.updated_at
        };
      });
    } else {
      return {
        // add your transformation object here
        id: model.id,
        name: model.name,
        description: model.description,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  };
}

module.exports = ProductCategoryTransformer;
