module.exports = class OrderController {
  constructor({ customLogger, customResponse, orderService, customNetwork }) {
    this.logger = customLogger.initLogger("OrderController");
    this.response = customResponse;
    this.orderService = orderService;
    this.axios = customNetwork;
  }

  /* Order CRUDS */
  getOrder = async (req, res, next) => {
    this.logger.info("getOrder controller initiated");
    const { id = null } = req.query;
    const data = await this.orderService.getOrder({ id }).catch((e) => {
      this.logger.error(`${e}`);
      next(e);
    });
    console.log({ data });
    if (data == null) {
      return this.response.success(res, 200, data);
    }
    this.logger.info("getOrder controller completed");
    return data ? this.response.success(res, 200, data) : true;
  };
  createOrder = async (req, res, next) => {
    this.logger.info("createOrder controller initiated");
    const OrderData = await this.orderService
      .createOrder(req.body)
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });

    this.logger.info("createOrder controller completed");
    return OrderData ? this.response.success(res, 200, OrderData) : true;
  };
  deleteOrder = async (req, res, next) => {
    this.logger.info("deleteOrder controller initiated");
    const { id } = req.query;
    const data = await this.orderService.deleteOrder({ id }).catch((e) => {
      this.logger.error(`${e}`);
      next(e);
    });
    this.logger.info("deleteOrder controller completed");
    return data ? this.response.success(res, 200, data) : true;
  };

  /* Order Fields Updates */
  updateOrder = async (req, res, next) => {
    this.logger.info("updateOrder controller initiated");
    const { id } = req.query;
    const result = await this.orderService
      .updateOrder({
        id,
        updates: req.body,
      })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    this.logger.info("updateOrder controller completed");
    return result ? this.response.success(res, 200, result) : true;
  };

  /* Order Inspection Updates */
  updateInspectionForm = async (req, res, next) => {
    const { id } = req.query;
    const { filledForm } = req.body;
    const result = await this.orderService.updateInspectionForm({
      id,
      filledForm,
    });
    return result ? this.response.success(res, 200, result) : true;
  };
  updateInspectionStatus = async (req, res, next) => {
    const { id } = req.query;
    const { status } = req.body;
    const result = await this.orderService
      .updateInspectionStatus({ id, status })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          status: result.status,
        })
      : true;
  };
  getInspectionForm = async (req, res, next) => {
    const { id } = req.query;
    const result = await this.orderService
      .getInspectionForm({ id })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          formData: result.formData,
        })
      : true;
  };

  /* Order Assignment Updates */
  updateIMAssignment = async (req, res, next) => {
    const { id } = req.query;
    const { imId } = req.body;
    const result = await this.orderService
      .updateIMId({ id, imId })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          imId: result.imId,
        })
      : true;
  };
  updatePMAssignment = async (req, res, next) => {
    const { id } = req.query;
    const { pmId } = req.body;
    const result = await this.orderService
      .updatePMId({ id, pmId })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          pmId: result.pmId,
        })
      : true;
  };

  /* Order Tracking */
  trackOrderStatus = async (req, res, next) => {
    const { id } = req.query;
    const result = await this.orderService
      .trackOrderStatus({ id })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          status: result.status,
        })
      : true;
  };

  /* Document Uploads */
  getDocumentsDetails = async (req, res, next) => {
    const { id } = req.query;
    const result = await this.orderService
      .getOrderDocument({ id })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          documents: result.formData.documents,
          uploadedDocuments: result.documentUploaded,
        })
      : true;
  };

  uploadDocument = async (req, res, next) => {
    const { id, type } = req.query;
    const filePath = req.filePath;
    const result = await this.orderService
      .uploadDocument({ id, type, filePath })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    return result
      ? this.response.success(res, 200, {
          id: result["_id"],
          status: result,
        })
      : true;
  };
};
