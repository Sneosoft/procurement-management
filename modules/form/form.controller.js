module.exports = class FormController {
  constructor({ customLogger, customResponse, formService, customNetwork }) {
    this.logger = customLogger.initLogger("FormController");
    this.response = customResponse;
    this.formService = formService;
    this.axios = customNetwork;
  }
  getForm = async (req, res, next) => {
    this.logger.info("getform controller initiated");
    const { id = null } = req.query;
    const data = await this.formService.getForm({ id }).catch((e) => {
      this.logger.error(`${e}`);
      next(e);
    });
    this.logger.info("getform controller completed");
    return data ? this.response.success(res, 200, data) : true;
  };

  createForm = async (req, res, next) => {
    this.logger.info("createForm controller initiated");
    const formData = await this.formService.createForm(req.body).catch((e) => {
      this.logger.error(`${e}`);
      next(e);
    });
    this.logger.info("createForm controller completed");
    return formData ? this.response.success(res, 200, formData) : true;
  };

  updateForm = async (req, res, next) => {
    this.logger.info("updateForm controller initiated");
    const { id } = req.query;
    const { content, templateName } = req.body;
    const data = await this.formService
      .updateForm({
        id,
        content,
        templateName,
      })
      .catch((e) => {
        this.logger.error(`${e}`);
        next(e);
      });
    this.logger.info("updateForm controller completed");
    return data ? this.response.success(res, 200, data) : true;
  };

  deleteForm = async (req, res, next) => {
    this.logger.info("deleteForm controller initiated");
    const { id } = req.query;
    const data = await this.formService.deleteForm({ id }).catch((e) => {
      this.logger.error(`${e}`);
      next(e);
    });
    this.logger.info("deleteForm controller completed");
    return data ? this.response.success(res, 200, data) : true;
  };
};
