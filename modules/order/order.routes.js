const { Router } = require("express");
module.exports = class OrderRoutes {
  constructor({ orderController, fileUploader }) {
    this.getOrder = orderController.getOrder;
    this.createOrder = orderController.createOrder;
    this.updateOrder = orderController.updateOrder;
    this.deleteOrder = orderController.deleteOrder;

    this.trackStatus = orderController.trackOrderStatus;
    this.updatePM = orderController.updatePMAssignment;
    this.updateIM = orderController.updateIMAssignment;
    this.updateInspectionForm = orderController.updateInspectionForm;
    this.updateInspectionStatus = orderController.updateInspectionStatus;
    this.getInspectionForm = orderController.getInspectionForm;
    this.getDocumentsDetails = orderController.getDocumentsDetails;
    this.uploadDocument = orderController.uploadDocument;
    this.multer = fileUploader.upload;
  }

  orderRouter = () => {
    const routes = Router();
    routes.get("/", this.getOrder);
    routes.post("/", this.createOrder);
    routes.put("/", this.updateOrder);
    routes.delete("/", this.deleteOrder);

    routes.get("/status/track", this.trackStatus);

    routes.put("/assignment/im", this.updateIM);
    routes.put("/assignment/pm", this.updatePM);

    routes.get("/inspect/form", this.getInspectionForm);
    routes.put("/inspect/form", this.updateInspectionForm);
    routes.put("/inspect/status", this.updateInspectionStatus);

    routes.get("/document", this.getDocumentsDetails);
    routes.post(
      "/document",
      this.multer.array("details", 1),
      this.uploadDocument
    );

    return routes;
  };
};
