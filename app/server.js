require("dotenv").config();
require("./config")
  .getConfig()
  .then(async (config) => {
    /* Configure application booting imports */
    const app = require("./app");
    const { createContainer } = require("./container");
    const { router } = require("./routes");

    /* Setup application container */
    const container = createContainer(config);

    /* Setup application api */
    router(app, container);

    /* Start listening */
    app.listen(config.port, () => {
      console.log("server started on port : ", config.port);
    });
  });
