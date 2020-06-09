"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * OrderStatusTransformer class
 *
 * @class OrderStatusTransformer
 * @constructor
 */
class OrderStatusTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      color: model.color
    };
  }
  transformWithTimestamp(model) {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      color: model.color,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
}

module.exports = OrderStatusTransformer;
