"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const DiscountApplicationTransformer = use(
  "App/Transformers/Admin/DiscountApplicationTransformer"
);
const UserTransformer = use("App/Transformers/Admin/UserTransformer");

/**
 * CouponTransformer class
 *
 * @class CouponTransformer
 * @constructor
 */
class CouponTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["discountApplication"];
  }
  static get availableInclude() {
    return ["products", "productCategories", "users"];
  }
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => ({
    id: model.id,
    code: model.code,
    value: parseFloat(model.value),
    quantity: parseInt(model.quantity),
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
    value: parseFloat(model.value),
    quantity: parseInt(model.quantity),
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
    this.item(model.getRelated("products"), async (products) =>
      Promise.all(
        products.map(async (product) => {
          let images = await product.images().fetch();
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            images: images.toJSON()
          };
        })
      )
    );

  includeProductCategories = (model) =>
    this.item(model.getRelated("productCategories"), async (categories) =>
      Promise.all(
        categories.map(async (category) => {
          let images = await category.images().fetch();
          return {
            id: category.id,
            name: category.name,
            price: category.price,
            description: category.description,
            images: images.toJSON()
          };
        })
      )
    );

  includeUsers = async (model) =>
    this.item(model.getRelated("users"), async (users) =>
      Promise.all(
        users.map(async (user) => {
          let person = await user.person().fetch();
          return { id: user.id, email: user.email, name: person.name };
        })
      )
    );
}

module.exports = CouponTransformer;
