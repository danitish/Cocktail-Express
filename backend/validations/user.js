const Joi = require("joi");

const registerValidation = (user) => {
  return Joi.object({
    full_name: Joi.string().required().min(5).label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(6).max(1024).label("Password"),
  }).validate(user);
};

const loginValidation = (user) => {
  return Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(6).max(1024).label("Password"),
  }).validate(user);
};

module.exports = { registerValidation, loginValidation };
