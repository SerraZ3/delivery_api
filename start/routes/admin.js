/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  /**
   *
   * Rotas para Imagens
   * index/store/show/update/destroy
   *
   * */

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
    );
  Route.resource("product-categories", "ProductCategoryController")
    .apiOnly()
    .validator(
      new Map([
        [["product-categories.store"], ["Admin/ProductCategoryStore"]],
        [["product-categories.update"], ["Admin/ProductCategoryUpdate"]]
      ])
    );

  Route.resource("order-status", "OrderStatusController")
    .apiOnly()
    .validator(
      new Map([
        [["order-status.store"], ["Admin/OrderStatusStore"]],
        [["order-status.update"], ["Admin/OrderStatusUpdate"]]
      ])
    );

  Route.resource("delivery-type", "DeliveryTypeController")
    .apiOnly()
    .validator(
      new Map([
        [["delivery-type.store"], ["Admin/DeliveryTypeStore"]],
        [["delivery-type.update"], ["Admin/DeliveryTypeUpdate"]]
      ])
    );
  Route.resource("users", "UserController")
    .apiOnly()
    .validator(
      new Map([
        [["users.store"], ["Admin/UserStore"]],
        [["users.update"], ["Admin/UserUpdate"]]
      ])
    );
})
  .prefix("v1/api/admin")
  .namespace("Admin")
  .middleware(["auth:jwt", "is:(admin || manager)"]);
