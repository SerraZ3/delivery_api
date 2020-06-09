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
  transform(model) {
    // Se houver muitos produtos para retornar
    if (model.length > 0) {
      let date = [];
      model.map((val, idx) => {
        date.push({
          id: model[idx].id,
          name: model[idx].name,
          price: model[idx].price,
          description: model[idx].description
        });
      });
      return date;
    } else {
      // Se houver apenas um produto para retornar
      return {
        id: model.id,
        name: model.name,
        price: model.price,
        description: model.description
      };
    }
  }
  transformWithTimestamp(model) {
    // Se houver muitos produtos para retornar
    if (model.length > 0) {
      let date = [];
      model.map((val, idx) => {
        date.push({
          id: model[idx].id,
          name: model[idx].name,
          price: model[idx].price,
          description: model[idx].description,
          created_at: model[idx].created_at,
          updated_at: model[idx].updated_at
        });
      });
      return date;
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
  }
  includeImages(model) {
    // Pega o relacionamento de produto com a imagem
    return this.item(model.getRelated("images"), ImageTransformer);
  }
  includeProductCategories(model) {
    // Pega o relacionamento do produto com a categoria
    return this.item(
      model.getRelated("productCategories"),
      ProductCategoryTransformer
    );
  }
}

module.exports = ProductTransformer;
