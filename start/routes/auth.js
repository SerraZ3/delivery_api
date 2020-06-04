/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Agrupar rodas
Route.group(() => {
  Route.post("register", "AuthController.register")
    .as("auth.register")
    .middleware("guest")
    .validator("Auth/Register");

  Route.post("login", "AuthController.login")
    .as("auth.login")
    .middleware("guest")
    .validator("Auth/Login");

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
