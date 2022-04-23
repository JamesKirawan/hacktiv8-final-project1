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

exports.validatePutReflection = async (req, res, next) => {
  const schema = Joi.object().keys({
    success: Joi.string().empty(""),
    low_point: Joi.string().empty(""),
    take_away: Joi.string().empty(""),
  });
  if (schema.validate(req.body).error) {
    res.send(schema.validate(req.body).error.details);
  } else {
    next();
  }
};