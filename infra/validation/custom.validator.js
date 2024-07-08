module.exports = class CustomValidator {
  constructor({
    userValidation,
    authValidation,
    orderValidation,
    formValidation,
  }) {
    this.validationSchema = {
      user: userValidation,
      auth: authValidation,
      order: orderValidation,
      form: formValidation,
    };
  }
  routeValidator = (req, res, next) => {
    const key = req.path.split("/")[1];
    const schemaPathBody = `BODY/${req.method}${req.path}`;
    const schemaPathQuery = `QUERY/${req.method}${req.path}`;
    console.log({ schemaPathBody, schemaPathQuery });
    let schema = this.validationSchema[key];
    this.validate(
      schema[schemaPathQuery],
      schema[schemaPathBody],
      req.body,
      req.query,
      next
    );
  };

  validate = (schemaQuery, schemaBody, body, query, next) => {
    const { value: valueQuery, error: errorQuery } =
      schemaQuery.validate(query);
    const { value: valueBody, error: errorBody } = schemaBody.validate(body);
    if (errorQuery) {
      return next(errorQuery);
    }
    if (errorBody) {
      return next(errorBody);
    }
    return next();
  };
};
