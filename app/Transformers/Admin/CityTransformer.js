"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const StateTransformer = use("App/Transformers/Admin/StateTransformer");

/**
 * CityTransformer class
 *
 * @class CityTransformer
 * @constructor
 */
class CityTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["state"];
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
  includeState(model) {
    return this.item(model.getRelated("state"), StateTransformer);
  }
}

module.exports = CityTransformer;
