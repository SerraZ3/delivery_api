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
  transform(model) {
    return {
      id: model.id,
      code: model.code,
      value: parseFloat(model.value),
      type: model.type,
      recursive: model.recursive,
      active: model.active,
      apply_total_order: model.apply_total_order
    };
  }
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp(model) {
    return {
      id: model.id,
      code: model.code,
      value: model.value,
      type: model.type,
      recursive: model.recursive,
      active: model.active,
      apply_total_order: model.apply_total_order,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
  includeDiscountApplication(model) {
    return this.item(
      model.getRelated("discountApplication"),
      DiscountApplicationTransformer
    );
  }
  includeProducts(model) {
    return this.item(model.getRelated("products"), (prod) => {
      let data = [];
      prod.map((val, idx) => {
        data.push({
          id: prod[idx].id,
          name: prod[idx].name,
          price: prod[idx].price,
          description: prod[idx].description
        });
      });
      return data;
    });
  }
  includeProductCategories(model) {
    return this.item(model.getRelated("productCategories"), (cat) => {
      let data = [];
      cat.map((val, idx) => {
        data.push({
          id: cat[idx].id,
          name: cat[idx].name,
          price: cat[idx].price,
          description: cat[idx].description
        });
      });
      return data;
    });
  }
}

module.exports = LoyaltyCardTransformer;
