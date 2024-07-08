const Joi = require("joi");
module.exports = class AuthValidation {
  constructor() {}
  "BODY/POST/auth/login" = Joi.object({
    username: Joi.alternatives().try(
      Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      Joi.number().integer().min(1000000000).max(9999999999)
    ),
    password: Joi.string()
      .min(8) // Minimum length of 8 characters
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")) // Alphanumeric characters only
      .required(),
  });
  "QUERY/POST/auth/login" = Joi.object({});

  "BODY/GET/auth/logout" = Joi.object({});
  "QUERY/GET/auth/logout" = Joi.object({});
};
