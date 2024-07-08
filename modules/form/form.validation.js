const Joi = require("joi");
module.exports = class FormValidation {
  constructor() {}
  "BODY/GET/form" = Joi.object({});
  "QUERY/GET/form" = Joi.object({
    id: Joi.string().optional(),
  });

  "QUERY/POST/form/" = Joi.object({});
  "BODY/POST/form/" = Joi.object({
    templateName: Joi.string().required(),
    content: Joi.object().required(),
  });

  "QUERY/PUT/form/" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/PUT/form/" = Joi.object({
    templateName: Joi.string().required(),
    content: Joi.object().required(),
  });

  "QUERY/DELETE/form/" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/DELETE/form/" = Joi.object({});
};
