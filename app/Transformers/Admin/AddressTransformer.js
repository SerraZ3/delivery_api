"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const CityTransformer = use("App/Transformers/Admin/CityTransformer");

/**
 * AddressTransformer class
 *
 * @class AddressTransformer
 * @constructor
 */
class AddressTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["city"];
  }
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((address) => {
        return {
          id: address.id,
          street: address.street,
          neightborhood: address.neightborhood,
          zip_code: address.zip_code,
          number: address.number
        };
      });
    } else if (model.length === 0) {
      return [];
    } else {
      return {
        id: model.id,
        street: model.street,
        neightborhood: model.neightborhood,
        zip_code: model.zip_code,
        number: model.number
      };
    }
  };
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp = (model) => ({
    id: model.id,
    street: model.street,
    neightborhood: model.neightborhood,
    zip_code: model.zip_code,
    number: model.number,
    created_at: model.created_at,
    updated_at: model.updated_at
  });

  includeCity = (model) => this.item(model.getRelated("city"), CityTransformer);
}

module.exports = AddressTransformer;
