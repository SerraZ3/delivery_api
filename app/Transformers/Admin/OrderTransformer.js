"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const OrderStatusTransformer = use(
  "App/Transformers/Admin/OrderStatusTransformer"
);
const UserTransformer = use("App/Transformers/Auth/UserTransformer");
const PersonTransformer = use("App/Transformers/Admin/PersonTransformer");
const AddressTransformer = use("App/Transformers/Admin/AddressTransformer");
const DeliveryTypeTransformer = use(
  "App/Transformers/Admin/DeliveryTypeTransformer"
);
/**
 * OrderTransformer class
 *
 * @class OrderTransformer
 * @constructor
 */
class OrderTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return [
      "orderStatus",
      "user",
      "person",
      "address",
      "deliveryType",
      "products"
    ];
  }
  /**
   * This method is used to transform the default data.
   */
  transform = (model) => ({
    id: model.id
  });
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp = (model) => ({
    id: model.id,
    created_at: model.created_at,
    updated_at: model.updated_at
  });

  includeOrderStatus = (model) =>
    this.item(model.getRelated("orderStatus"), OrderStatusTransformer);

  includeUser = (model) => this.item(model.getRelated("user"), UserTransformer);

  includePerson = (model) =>
    this.item(model.getRelated("person"), PersonTransformer);

  includeAddress = (model) =>
    this.item(model.getRelated("address"), AddressTransformer);

  includeDeliveryType = (model) =>
    this.item(model.getRelated("deliveryType"), DeliveryTypeTransformer);

  includeProducts = (model) =>
    this.item(model.getRelated("products"), (products) => {
      if (products.length > 0) {
        return products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            description: product.description,
            quantity: product.$relations.pivot.quantity
          };
        });
      } else {
        // Se houver apenas um produto para retornar
        return {
          id: products.id,
          name: products.name,
          price: parseFloat(products.price),
          description: products.description,
          quantity: products.$relations.pivot.quantity
        };
      }
    });
}

module.exports = OrderTransformer;
