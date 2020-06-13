"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const DiscountApplicationTransformer = use(
  "App/Transformers/Admin/DiscountApplicationTransformer"
);
/**
 * LoyaltyCardTransformer class
 *
 * @class LoyaltyCardTransformer
 * @constructor
 */
class LoyaltyCardTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["discountApplication"];
  }
  static get availableInclude() {
    return ["products", "productCategories"];
  }
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => ({
    id: model.id,
    code: model.code,
    value: parseFloat(model.value),
    type: model.type,
    recursive: model.recursive,
    active: model.active,
    apply_total_order: model.apply_total_order
  });
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp = (model) => ({
    id: model.id,
    code: model.code,
    value: model.value,
    type: model.type,
    recursive: model.recursive,
    active: model.active,
    apply_total_order: model.apply_total_order,
    created_at: model.created_at,
    updated_at: model.updated_at
  });

  includeDiscountApplication = (model) =>
    this.item(
      model.getRelated("discountApplication"),
      DiscountApplicationTransformer
    );

  includeProducts = (model) =>
    this.item(model.getRelated("products"), (products) =>
      products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description
      }))
    );

  includeProductCategories = (model) =>
    this.item(model.getRelated("productCategories"), (categories) =>
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        price: category.price,
        description: category.description
      }))
    );
}

module.exports = LoyaltyCardTransformer;
