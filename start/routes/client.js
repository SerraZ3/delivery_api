/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  /**
   *
   * Rotas para Imagens
   * index/store/show/update/destroy
   *
   * */
  Route.resource("products", "Admin/ProductController").only(["index", "show"]);
  Route.get("product-categories", "Client/ProductController.categoryList");
  Route.resource("user", "Admin/UserController")
    .only(["show", "update", "delete"])
    .middleware(["auth:jwt"]);
}).prefix("v1/api/client");
