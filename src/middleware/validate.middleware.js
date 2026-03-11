// validates req body/query against a zod schema
const validate = (schema, target = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[target]);
  if (!result.success) {
    return next(result.error);
  }
  req.valid = req.valid || {};
  req.valid[target] = result.data;
  next();
};

export default validate;
