module.exports = class ErrorHandler {
  constructor({ customLogger, customResponse }) {
    this.logger = customLogger.initLogger("ErrorHandler");
    this.response = customResponse;
  }

  catchAll = (err, req, res, next) => {
    const ctx = {
      path: req.path,
      method: req.method,
      err: `${err}`,
    };
    this.logger.error(ctx);
    console.log(err);
    return this.response.failed(res, 500, ctx);
  };
};
