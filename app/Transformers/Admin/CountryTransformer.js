"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * CountryTransformer class
 *
 * @class CountryTransformer
 * @constructor
 */
class CountryTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => ({
    id: model.id,
    name_br: model.name_br,
    name_en: model.name_en
  });
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp = (model) => ({
    id: model.id,
    name_br: model.name_br,
    name_en: model.name_en,
    created_at: model.created_at,
    updated_at: model.updated_at
  });
}

module.exports = CountryTransformer;
