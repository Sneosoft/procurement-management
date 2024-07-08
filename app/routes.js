exports.router = (app, container) => {
  const {
    authRoutes,
    userRoutes,
    errorHandler,
    customValidator,
    swaggerConfig,
    formRoutes,
    orderRoutes,
    authService,
  } = container.cradle;

  app.use(
    "/api-docs",
    swaggerConfig.swaggerServe,
    swaggerConfig.swaggerUiSetup
  );
  app.use(authService.sessionValidate);
  app.use(customValidator.routeValidator);
  app.use("/auth", authRoutes.authRouter());
  app.use("/user", userRoutes.userRouter());
  app.use("/form", formRoutes.formRouter());
  app.use("/order", orderRoutes.orderRouter());
  app.use(errorHandler.catchAll);
};
