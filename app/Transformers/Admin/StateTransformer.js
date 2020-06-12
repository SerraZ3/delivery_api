"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const CountryTransformer = use("App/Transformers/Admin/CountryTransformer");

/**
 * StateTransformer class
 *
 * @class StateTransformer
 * @constructor
 */
class StateTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["country"];
  }
  /**
   * This method is used to transform the default data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name
    };
  }
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp(model) {
    return {
      id: model.id,
      name: model.name,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
  includeCountry(model) {
    return this.item(model.getRelated("country"), CountryTransformer);
  }
}

module.exports = StateTransformer;
