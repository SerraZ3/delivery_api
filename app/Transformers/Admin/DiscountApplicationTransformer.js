"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * DiscountApplicationTransformer class
 *
 * @class DiscountApplicationTransformer
 * @constructor
 */
class DiscountApplicationTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => ({
    id: model.id,
    name: model.name,
    slug: model.slug
  });
}

module.exports = DiscountApplicationTransformer;
