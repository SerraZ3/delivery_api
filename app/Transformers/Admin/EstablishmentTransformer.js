"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const ImageTransformer = use("App/Transformers/Admin/ImageTransformer");
const AddressTransformer = use("App/Transformers/Admin/AddressTransformer");
const TypeEstablishmentTransformer = use(
  "App/Transformers/Admin/TypeEstablishmentTransformer"
);

/**
 * EstablishmentTransformer class
 *
 * @class EstablishmentTransformer
 * @constructor
 */
class EstablishmentTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["images", "typeEstablishment", "addresses"];
  }
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((establishment) => {
        return {
          id: establishment.id,
          name: establishment.name,
          description: establishment.description
        };
      });
    } else if (model.length === 0) {
      return [];
    } else {
      return {
        id: model.id,
        name: model.name,
        description: model.description
      };
    }
  };
  transformWithTimestamp = (model) => {
    if (model.length > 0) {
      return model.map((establishment) => {
        return {
          id: establishment.id,
          name: establishment.name,
          description: establishment.description,
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
        description: model.description,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  };
  includeImages = (model) =>
    this.item(model.getRelated("images"), ImageTransformer);
  includeTypeEstablishment = (model) =>
    this.item(
      model.getRelated("typeEstablishment"),
      TypeEstablishmentTransformer
    );
  includeAddresses = (model) =>
    this.item(model.getRelated("addresses"), (addresses) => {
      if (addresses.length > 0) {
        return addresses.map((address) => {
          return {
            id: address.id,
            street: address.street,
            neightborhood: address.neightborhood,
            zip_code: address.zip_code,
            number: address.number
          };
        });
      } else if (addresses.length === 0) {
        return [];
      } else {
        return {
          id: addresses.id,
          street: addresses.street,
          neightborhood: addresses.neightborhood,
          zip_code: addresses.zip_code,
          number: addresses.number
        };
      }
    });
}

module.exports = EstablishmentTransformer;
