const bcrypt = require("bcrypt");
module.exports = class UserController {
  constructor({
    customLogger,
    customResponse,
    userModel,
    customNetwork,
    authModel,
    userService,
  }) {
    this.logger = customLogger.initLogger("UserController");
    this.response = customResponse;
    this.user = userModel;
    this.axios = customNetwork;
    this.authUpdate = authModel.updateAuth;
    this.authDelete = authModel.deleteAuth;
    this.authAdd = authModel.addUserAuth;
    this.userDelete = userModel.deleteUser;
    this.authDelete = authModel.deleteAuth;
    this.assignReportingManager = userService.assignReportingManager;
  }
  getUser = async (req, res, next) => {
    let err = false;
    const { id } = req.query;
    this.logger.info("getUser controller started");
    let query = {};
    if (id) {
      query = { id };
    }

    const user = await this.user.getUserById(query).catch((e) => {
      err = true;
      return next(e);
    });

    if (err) {
      return true;
    }
    this.logger.info("getUser controller finished");
    return this.response.success(res, 200, user);
  };
  createUser = async (req, res, next) => {
    const { email, password, role, mobile } = req.body;
    const privilege = [
      "public",
      "client",
      "inspectionmanager",
      "procurementmanager",
      "admin",
    ];
    const accessLevel = privilege.findIndex((e) => e == role.toLowerCase());
    this.logger.info("Hello User World I am checking create user ...");
    const result = await this.user
      .createUser({
        email,
        password,
        role,
        accessLevel,
        mobile: Number(mobile),
        delete: 0,
      })
      .catch((e) => {
        return next(e);
      });

    console.log({ result });
    const authAddResult = await this.authAdd({
      userId: result["_id"],
      email,
      mobile: Number(mobile),
      password: bcrypt.hashSync(password, 10),
      role,
      accessLevel,
      delete: 0,
    });
    if (!result || !authAddResult) {
      return true;
    }
    this.logger.info(result);
    return result
      ? this.response.success(res, 200, {
          auth: authAddResult,
          user: result,
        })
      : true;
  };
  updateUser = async (req, res, next) => {
    const { id } = req.query;
    const { mobile, email, password } = req.body;
    const result = await this.user
      .updateUser({ id, mobile, email, password })
      .catch((e) => {
        return next(e);
      });

    const authUpdateResult = this.authUpdate({
      id,
      updates: { mobile, email, password },
    }).catch((e) => {
      return next(e);
    });
    if (!result || !authUpdateResult) {
      return true;
    }

    return result
      ? this.response.success(res, 200, {
          auth: authUpdateResult,
          user: result,
        })
      : true;
  };
  deleteUser = async (req, res, next) => {
    const { id } = req.query;
    const result = await this.userDelete({ id }).catch((e) => {
      return next(e);
    });

    const authDelete = await this.authDelete({ email: result.email });
    if (!result || !authDelete) {
      return true;
    }
    return result
      ? this.response.success(res, 200, {
          auth: authDelete,
          user: result,
        })
      : true;
  };
  assignReporting = async (req, res, next) => {
    const { id } = req.query;
    const { reportTo } = req.body;
    const result = await this.assignReportingManager({ id, reportTo }).catch(
      (e) => {
        return next(e);
      }
    );

    return result
      ? this.response.success(res, 200, {
          user: result,
        })
      : true;
  };
};
