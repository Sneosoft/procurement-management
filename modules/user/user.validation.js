const Joi = require("joi");
const JoiPhoneNumber = require("joi-phone-number").default;

module.exports = class UserValidation {
  constructor() {}
  "BODY/POST/user/" = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    role: Joi.string()
      .valid(
        "public",
        "client",
        "inspectionmanager",
        "procurementmanager",
        "admin"
      )
      .required(),
    mobile: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .required(),
  });
  "QUERY/POST/user/" = Joi.object({});

  "QUERY/GET/user/" = Joi.object({
    id: Joi.string().optional(),
  });
  "BODY/GET/user/" = Joi.object({});

  "QUERY/PUT/user" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/PUT/user" = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    password: Joi.string()
      .min(8) // Minimum length of 8 characters
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")) // Alphanumeric characters only
      .optional(),
    role: Joi.string()
      .valid(
        "public",
        "client",
        "inspectionmanager",
        "procurementmanager",
        "admin"
      )
      .optional(),
    mobile: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .optional(),
  });

  "QUERY/DELETE/user/" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/DELETE/user/" = Joi.object({});

  "BODY/PUT/user/assign" = Joi.object({
    reportTo: Joi.string().required(),
  });
  "QUERY/PUT/user/assign" = Joi.object({
    id: Joi.string().required(),
  });
};
