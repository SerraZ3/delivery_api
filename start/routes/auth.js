/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Agrupar rodas
Route.group(() => {
  Route.post("register", "AuthController.registerClient")
    .as("auth.registerClient")
    .middleware("guest")
    .validator("Auth/Register");

  Route.post("register-establishment", "AuthController.registerEstablishment")
    .as("auth.registerEstablishment")
    .middleware("guest")
    .validator("Auth/RegisterEstablishment");

  Route.post("login", "AuthController.login")
    .as("auth.login")
    .middleware("guest")
    .validator("Auth/Login");

  Route.get("/login/:provider", "AuthController.redirectToProvider")
    .as("social.login")
    .middleware("guest");
  Route.get("/authenticated/:provider", "AuthController.handleProviderCallback")
    .as("social.login.callback")
    .middleware("guest");

  Route.get("role-permission", "AuthController.rolePermission")
    .as("auth.role-permission")
    .middleware("auth:jwt");
  // .validator("Auth/Login");

  Route.post("refresh", "AuthController.refresh")
    .as("auth.refresh")
    .middleware("guest");

  Route.post("logout", "AuthController.logout")
    .as("auth.logout")
    .middleware("auth");

  // Restore password methods
  Route.post("reset-password", "AuthController.forgot")
    .as("auth.forgot")
    .middleware("guest")
    .validator("Auth/Forgot");

  Route.get("reset-password", "AuthController.remember")
    .as("auth.remember")
    .middleware("guest")
    .validator("Auth/Forgot");

  Route.put("reset-password", "AuthController.reset")
    .as("auth.reset")
    .middleware("guest")
    .validator("Auth/Reset");
})
  .prefix("v1/api/auth")
  .namespace("Auth");
