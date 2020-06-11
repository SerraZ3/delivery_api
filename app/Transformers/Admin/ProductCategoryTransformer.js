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
  transform(model) {
    if (model.length > 0) {
      let data = [];
      model.map((val, idx) => {
        data.push({
          id: model[idx].id,
          name: model[idx].name,
          description: model[idx].description
        });
      });
      return data;
    } else {
      return {
        // add your transformation object here
        id: model.id,
        name: model.name,
        description: model.description
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
          description: model[idx].description,
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
        description: model.description,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  }
}

module.exports = ProductCategoryTransformer;
