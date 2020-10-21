"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const ImageTransformer = use("App/Transformers/Admin/ImageTransformer");
const EstablishmentTransformer = use(
  "App/Transformers/Admin/EstablishmentTransformer"
);

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["images", "productCategories", "establishment"];
  }
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    // Se houver muitos produtos para retornar
    if (model.length > 0) {
      return model.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description
        };
      });
    } else {
      // Se houver apenas um produto para retornar
      return {
        id: model.id,
        name: model.name,
        price: model.price,
        description: model.description
      };
    }
  };
  transformWithTimestamp = (model) => {
    // Se houver muitos produtos para retornar
    if (model.length > 0) {
      return model.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          created_at: product.created_at,
          updated_at: product.updated_at
        };
      });
    } else {
      // Se houver apenas um produto para retornar
      return {
        id: model.id,
        name: model.name,
        price: model.price,
        description: model.description,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  };
  includeImages = (model) =>
    this.item(model.getRelated("images"), ImageTransformer);
  includeEstablishment = (model) =>
    this.item(model.getRelated("establishment"), EstablishmentTransformer);

  includeProductCategories = (model) =>
    this.item(model.getRelated("productCategories"), async (categories) => {
      if (categories.length > 0) {
        return Promise.all(
          categories.map(async (category) => {
            let images = await category.images().fetch();
            return {
              id: category.id,
              name: category.name,
              description: category.description,
              images: images.toJSON()
            };
          })
        );
      } else if (categories.length === 0) return [];
      else {
        let images = await category.images().fetch();
        return {
          // add your transformation object here
          id: categories.id,
          name: categories.name,
          description: categories.description,
          images: images.toJSON()
        };
      }
    });
}

module.exports = ProductTransformer;
