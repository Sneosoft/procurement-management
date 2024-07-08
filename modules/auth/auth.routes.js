const { Router } = require("express");
module.exports = class AuthRoutes {
  constructor({ authController, authService }) {
    this.loginController = authController.sessionLogin;
    this.logoutController = authController.sessionLogout;
    this.sessionValidate = authService.sessionValidate;
    this.protectedRoute = authController.protected;
    this.addAuthController = authController.addAuth;
  }

  authRouter = () => {
    const routes = Router();
    routes.post("/login", this.loginController);
    routes.get("/logout", this.logoutController);
    routes.get("/protected", this.sessionValidate, this.protectedRoute);
    // routes.post("/", this.addAuthController);
    return routes;
  };
};
