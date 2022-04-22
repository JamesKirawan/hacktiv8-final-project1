const Joi = require("joi");

exports.validatePostReflection = async (req, res, next) => {
  const schema = Joi.object().keys({
    success: Joi.string().required(),
    low_point: Joi.string().required(),
    take_away: Joi.string().required(),
  });
  if (schema.validate(req.body).error) {
    res.send(schema.validate(req.body).error.details);
  } else {
    next();
  }
};
