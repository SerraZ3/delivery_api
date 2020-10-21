/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.resource("images", "ImageController")
    .apiOnly()
    .validator(
      new Map([
        [["images.store"], ["Admin/ImageStore"]],
        [["images.update"], ["Admin/ImageUpdate"]]
      ])
    );

  Route.resource("products", "ProductController")
    .apiOnly()
    .validator(
      new Map([
        [["products.store"], ["Admin/ProductStore"]],
        [["products.update"], ["Admin/ProductUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["products.index", "products.show"], ["can:read_products"]],
        [["products.store"], ["can:create_products"]],
        [["products.update"], ["can:update_products"]],
        [["products.delete"], ["can:delete_products"]]
      ])
    );
  Route.resource("product-categories", "ProductCategoryController")
    .apiOnly()
    .validator(
      new Map([
        [["product-categories.store"], ["Admin/ProductCategoryStore"]],
        [["product-categories.update"], ["Admin/ProductCategoryUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["products.index", "products.show"], ["can:read_products"]],
        [["products.store"], ["can:create_products"]],
        [["products.update"], ["can:update_products"]],
        [["products.delete"], ["can:delete_products"]]
      ])
    );

  Route.resource("order-status", "OrderStatusController")
    .apiOnly()
    .validator(
      new Map([
        [["order-status.store"], ["Admin/OrderStatusStore"]],
        [["order-status.update"], ["Admin/OrderStatusUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["order-status.index", "order-status.show"], ["can:read_orders"]],
        [["order-status.store"], ["can:create_orders"]],
        [["order-status.update"], ["can:update_orders"]],
        [["order-status.delete"], ["can:delete_orders"]]
      ])
    );

  Route.resource("delivery-type", "DeliveryTypeController")
    .apiOnly()
    .validator(
      new Map([
        [["delivery-type.store"], ["Admin/DeliveryTypeStore"]],
        [["delivery-type.update"], ["Admin/DeliveryTypeUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["delivery-type.index", "delivery-type.show"], ["can:read_orders"]],
        [["delivery-type.store"], ["can:create_orders"]],
        [["delivery-type.update"], ["can:update_orders"]],
        [["delivery-type.delete"], ["can:delete_orders"]]
      ])
    );
  Route.resource("users", "UserController")
    .apiOnly()
    .validator(
      new Map([
        [["users.store"], ["Admin/UserStore"]],
        [["users.update"], ["Admin/UserUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["users.index", "users.show"], ["can:read_users"]],
        [["users.store"], ["can:create_users"]],
        [["users.update"], ["can:update_users"]],
        [["users.delete"], ["can:delete_users"]]
      ])
    );
  Route.resource("deliverymen", "DeliverymanController")
    .only(["index", "destroy"])
    .middleware(
      new Map([
        [["deliverymen.index"], ["can:read_deliverymen"]],
        [["deliverymen.delete"], ["can:delete_deliverymen"]]
      ])
    );
  Route.resource("deliverymen", "UserController")
    .only(["show", "store", "update"])
    .validator(
      new Map([
        [["users.store"], ["Admin/UserStore"]],
        [["users.update"], ["Admin/UserUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["deliverymen.show"], ["can:read_deliverymen"]],
        [["deliverymen.store"], ["can:create_deliverymen"]],
        [["deliverymen.update"], ["can:update_deliverymen"]]
      ])
    );
  Route.resource("orders", "OrderController")
    .only(["index", "show", "update"])
    .validator(new Map([[["orders.update"], ["Admin/OrderUpdate"]]]))
    .middleware(
      new Map([
        [["orders.index", "orders.show"], ["can:read_orders"]],
        [["orders.update"], ["can:update_orders"]]
      ])
    );

  Route.resource("loyalty-cards", "LoyaltyCardController")
    .apiOnly()
    .validator(
      new Map([
        [["loyalty-cards.store"], ["Admin/LoyaltycardStore"]],
        [["loyalty-cards.update"], ["Admin/LoyaltycardUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["loyalty-cards.index", "loyalty-cards.show"], ["can:read_discounts"]],
        [["loyalty-cards.store"], ["can:create_discounts"]],
        [["loyalty-cards.update"], ["can:update_discounts"]],
        [["loyalty-cards.delete"], ["can:delete_discounts"]]
      ])
    );
  Route.resource("coupons", "CouponController")
    .apiOnly()
    .validator(
      new Map([
        [["coupons.store"], ["Admin/CouponStore"]],
        [["coupons.update"], ["Admin/CouponUpdate"]]
      ])
    )
    .middleware(
      new Map([
        [["coupons.index", "coupons.show"], ["can:read_discounts"]],
        [["coupons.store"], ["can:create_discounts"]],
        [["coupons.update"], ["can:update_discounts"]],
        [["coupons.delete"], ["can:delete_discounts"]]
      ])
    );
})
  .prefix("v1/api/admin")
  .namespace("Admin")
  .middleware(["auth:jwt", "is:(admin or manager)"]);
