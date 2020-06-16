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
  transform = async (model) => {
    model = model.toJSON();
    return {
      id: model.id,
      amount_will_paid: model.amount_will_paid,
      type_payment: model.type_payment,
      total: model.total,
      change_cash: await model.change_cash,
      total_price: await model.total_price
    };
  };
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp = async (model) => {
    model = await model.toJSON();
    return {
      id: model.id,
      amount_will_paid: model.amount_will_paid,
      type_payment: model.type_payment,
      total: model.total,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  };

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
      }
      if (products.length === 0) {
        return {};
      } else {
        // Se houver apenas um produto para retornar
        return {
          id: products.id,
          name: products.name,
          price: parseFloat(products.price),
          description: products.description,
          quantity: products.$relations
            ? products.$relations.pivot.quantity
            : null
        };
      }
    });
}

module.exports = OrderTransformer;
