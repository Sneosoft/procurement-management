const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const passport = require("passport");
const cors = require("cors");
const errorHandler = require("errorhandler");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.use(
  express.json(),
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
  helmet(),
  compression(),
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
      databaseName: process.env.sessionDb,
      uri: process.env.mongodbUri,
      collection: process.env.sessionCollection,
      expires: 1000 * 60 * 60 * 24, // Session will expire after 1 day (optional)
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
  morgan("tiny"),
  errorHandler(),
  passport.initialize(),
  passport.session()
);

module.exports = app;
