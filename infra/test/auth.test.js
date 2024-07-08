const authController = require("../../modules/auth/auth.controller");
const passport = require("passport");

const authInstance = new authController({
  authModel: jest.fn(),
  customResponse: jest.fn(),
  customLogger: { initLogger: (value) => value },
});

jest
  .spyOn(passport, "authenticate")
  .mockImplementation((strategy, callback) =>
    callback(null, { user: "mockUser" }, "info")
  );

describe("Auth Controller", () => {
  it("should call service.login with correct arguments", async () => {
    const req = {
      body: { username: "mockUsername", password: "mockPassword" },
      logIn: (user, cb) => {},
    };
    const res = { send: jest.fn() };
    const next = jest.fn();
    passport.authenticate = jest
      .fn()
      .mockImplementation((strategy, callback) => {
        // Simulate successful authentication
        callback(null, { email: "test@example.com" }, null);
        return (req, res, next) => {};
      });
    authInstance.sessionLogin(req, res, next);
    expect(passport.authenticate).toHaveBeenCalledWith(
      "local",
      expect.any(Function)
    );
    expect(res.send).not.toHaveBeenCalled();
  });
});
