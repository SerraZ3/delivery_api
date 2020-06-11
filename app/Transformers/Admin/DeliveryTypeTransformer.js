"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * DeliveryTypeTransformer class
 *
 * @class DeliveryTypeTransformer
 * @constructor
 */
class DeliveryTypeTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name,
      price: model.price
    };
  }
  transformWithTimestamp(model) {
    return {
      id: model.id,
      name: model.name,
      price: model.price,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
}

module.exports = DeliveryTypeTransformer;
