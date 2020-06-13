"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const ImageTransformer = use("App/Transformers/Admin/ImageTransformer");
const ProductCategoryTransformer = use(
  "App/Transformers/Admin/ProductCategoryTransformer"
);

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["images", "productCategories"];
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

  includeProductCategories = (model) =>
    this.item(
      model.getRelated("productCategories"),
      ProductCategoryTransformer
    );
}

module.exports = ProductTransformer;
