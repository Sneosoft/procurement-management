const Joi = require("joi");
module.exports = class OrderValidation {
  constructor() {}
  "QUERY/GET/order" = Joi.object({
    id: Joi.string().optional(),
  });
  "BODY/GET/order" = Joi.object({});

  "QUERY/POST/order" = Joi.object({});
  "BODY/POST/order" = Joi.object({
    amount: Joi.number().required(),
    formId: Joi.string().required(),
    pmId: Joi.string().required(),
    imId: Joi.string().required(),
    clientId: Joi.string().required(),
  });

  "BODY/PUT/order" = Joi.object({
    amount: Joi.number().optional(),
    formId: Joi.string().optional(),
    clientId: Joi.string().optional(),
    pmId: Joi.string().optional(),
    imId: Joi.string().optional(),
    status: Joi.string().optional(),
  });

  "QUERY/PUT/order" = Joi.object({
    id: Joi.string().required(),
  });

  "QUERY/DELETE/order" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/DELETE/order" = Joi.object({});

  "QUERY/GET/order/status/track" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/GET/order/status/track" = Joi.object({});

  "BODY/PUT/order/assignment/im" = Joi.object({
    imId: Joi.string().required(),
  });
  "QUERY/PUT/order/assignment/im" = Joi.object({
    id: Joi.string().required(),
  });

  "BODY/PUT/order/assignment/mm" = Joi.object({
    pmId: Joi.string().required(),
  });
  "QUERY/PUT/order/assignment/pm" = Joi.object({
    id: Joi.string().required(),
  });

  "QUERY/GET/order/inspect/form" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/GET/order/inspect/form" = Joi.object({});

  "BODY/PUT/order/inspect/form" = Joi.object({
    filledForm: Joi.object().required(),
  });
  "QUERY/PUT/order/inspect/form" = Joi.object({
    id: Joi.string().required(),
  });

  "BODY/PUT/order/inspect/status" = Joi.object({
    status: Joi.string().required(),
  });
  "QUERY/PUT/order/inspect/status" = Joi.object({
    id: Joi.string().required(),
  });

  "QUERY/POST/order/document" = Joi.object({
    id: Joi.string().required(),
    type: Joi.string().required(),
  });
  "BODY/POST/order/document" = Joi.object({});

  "QUERY/GET/order/document" = Joi.object({
    id: Joi.string().required(),
  });
  "BODY/GET/order/document" = Joi.object({});
};
