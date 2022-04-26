const Joi = require("joi");

exports.validateRegisterBody = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  if (schema.validate(req.body).error) {
    res.json({
      error: schema.validate(req.body).error.message,
    });
  } else {
    next();
  }
};

exports.validateLoginBody = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  if (schema.validate(req.body).error) {
    res.json({
      error: schema.validate(req.body).error.message,
    });
  } else {
    next();
  }
};
