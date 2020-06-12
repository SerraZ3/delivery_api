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
  transform(model) {
    return {
      id: model.id
    };
  }
  /**
   * This method is used to transform the default data.
   */
  transformWithTimestamp(model) {
    return {
      id: model.id,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
  includeOrderStatus(model) {
    return this.item(model.getRelated("orderStatus"), OrderStatusTransformer);
  }
  includeUser(model) {
    return this.item(model.getRelated("user"), UserTransformer);
  }
  includePerson(model) {
    return this.item(model.getRelated("person"), PersonTransformer);
  }
  includeAddress(model) {
    return this.item(model.getRelated("address"), AddressTransformer);
  }
  includeDeliveryType(model) {
    return this.item(model.getRelated("deliveryType"), DeliveryTypeTransformer);
  }
  includeProducts(model) {
    return this.item(model.getRelated("products"), (val) => {
      if (val.length > 0) {
        let data = [];

        val.map((value) => {
          console.log(value.$relations.pivot.quantity);

          data.push({
            id: value.id,
            name: value.name,
            price: parseFloat(value.price),
            description: value.description,
            quantity: value.$relations.pivot.quantity
          });
        });
        return data;
      } else {
        // Se houver apenas um produto para retornar
        return {
          id: val.id,
          name: val.name,
          price: parseFloat(value.price),
          description: val.description,
          quantity: val.$relations.pivot.quantity
        };
      }
    });
  }
}

module.exports = OrderTransformer;
