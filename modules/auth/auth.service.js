const passport = require("passport");
// const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const bcrypt = require("bcrypt");
module.exports = class AuthService {
  constructor({ authModel }) {
    this.authenticateUser = authModel.getAuthUser;
    passport.serializeUser((user, next) => {
      next(null, user.email);
    });

    passport.deserializeUser(async (email, next) => {
      const userFind = await this.authenticateUser(email);
      next(null, userFind);
    });
  }

  passportLocalStrategy = () => {
    return new passportLocal.Strategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, next) => {
        const user = await this.authenticateUser(username);
        console.log({ user });
        if (!user) {
          return next(null, false, { message: "Incorrect username." });
        }
        const compareResult = bcrypt.compareSync(password, user.password);
        if (!compareResult) {
          return next(null, false, { message: "Incorrect password." });
        }
        return next(null, { email: user.email });
      }
    );
  };

  initStartegy = (() => {
    passport.use(this.passportLocalStrategy());
  })();

  sessionValidate = (req, res, next) => {
    if (req.path == "/auth/login" && req.method == "POST") {
      return next(null);
    }

    if (req.isAuthenticated()) {
      const user = req.user;
      const authorize = this.authorizationRules(
        `${req.method}${req.path}`,
        user.accessLevel
      );

      if (!authorize) {
        return next("This is forbidden resource");
      }
      return next();
    }
    return next("Please login, you are currently not authenticated...");
  };

  authorizationRules = (route, roleLevel) => {
    const privilege = [
      "public",
      "client",
      "inspectionmanager",
      "procurementmanager",
      "admin",
    ];
    const routes = [
      "POST/auth/login",
      "GET/auth/logout",
      "GET/form",
      "POST/form",
      "PUT/form",
      "DELETE/form",
      "GET/order",
      "POST/order",
      "PUT/order",
      "DELETE/order",
      "GET/order/status/track",
      "PUT/order/assignment/im",
      "PUT/order/assignment/pm",
      "GET/order/inspect/form",
      "PUT/order/inspect/form",
      "PUT/order/inspect/status",
      "GET/user",
      "POST/user",
      "PUT/user",
      "DELETE/user",
      "PUT/assign",
      "GET/document",
      "POST/document",
    ];
    const authLevel = {
      "POST/auth/login": 0,
      "GET/auth/logout": 0,
      "GET/form": 2,
      "POST/form": 3,
      "PUT/form": 3,
      "DELETE/form": 3,
      "GET/order": 2,
      "POST/order": 3,
      "PUT/order": 3,
      "DELETE/order": 3,
      "GET/order/status/track": 1,
      "PUT/order/assignment/im": 3,
      "PUT/order/assignment/pm": 4,
      "GET/order/inspect/form": 2,
      "PUT/order/inspect/form": 2,
      "POST/order/document": 3,
      "GET/order/document": 3,
      "GET/user": 4,
      "POST/user": 4,
      "PUT/user": 4,
      "DELETE/user": 4,
      "PUT/user/assign": 4,
    };

    const routeLevel = authLevel[route];
    if (roleLevel >= routeLevel) {
      return true;
    } else {
      return false;
    }
  };
};
