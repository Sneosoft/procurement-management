const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = class AuthController {
  constructor({ authModel, customResponse, customLogger }) {
    this.logger = customLogger.initLogger("AuthController");
    this.response = customResponse;
    this.authModel = authModel;
  }

  sessionLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next("User not found");
        //res.send("User not found");
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send(
          `<h1>You Have Successfully Logged In, ${JSON.stringify(
            user.email
          )}!</h1>`
        );
      });
    })(req, res, next);
  };

  sessionLogout = async (req, res, next) => {
    return new Promise((resolve, reject) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.send("You have successfully Logged Out");
        return resolve();
      });
    });
  };

  protected = async (req, res, next) => {
    console.log(req.user);
    return res.send("I am your protected route ...");
  };

  addAuth = async (req, res, next) => {
    const { password, email } = req.body;
    const { id } = req.query;
    this.logger.info("Auth Controller Started");
    await this.authModel.addUserAuth({
      userId: id,
      email,
      password: bcrypt.hashSync(password, 10),
      delete: 0,
    });
    return this.response.success(res, 200);
  };
};
