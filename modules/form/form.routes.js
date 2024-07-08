const { Router } = require("express");
module.exports = class FormRoutes {
  constructor({ formController }) {
    this.getForm = formController.getForm;
    this.createForm = formController.createForm;
    this.updateForm = formController.updateForm;
    // this.updateForm = formController.updateForm;
    this.deleteForm = formController.deleteForm;
  }

  formRouter = () => {
    const routes = Router();
    routes.get("/", this.getForm);
    routes.post("/", this.createForm);
    routes.put("/", this.updateForm);
    routes.delete("/", this.deleteForm);
    return routes;
  };
};
