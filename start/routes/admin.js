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
  Route.resource("products", "ProductController").apiOnly();
})
  .prefix("v1/api/admin")
  .namespace("Admin")
  .middleware(["auth:jwt", "is:(admin || manager)"]);
