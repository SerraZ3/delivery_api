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
    .only(["show", "update", "destroy"])
    .middleware(["auth:jwt"]);

  Route.resource("orders", "Client/OrderController")
    .only(["show", "store", "destroy", "update"])
    .middleware(["auth:jwt", "is:client"]);
}).prefix("v1/api/client");
