const Joi = require("joi");

const createCashOrderCartVal = Joi.object({
  id: Joi.string().length(24).hex(),
  shippingAddress: Joi.object({
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
  }).required(),
});

const createCheckOutSessionsVal = Joi.object({
  id: Joi.string().length(24).hex(),
  shippingAddress: Joi.object({
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
  }),
});

module.exports = { createCashOrderCartVal, createCheckOutSessionsVal };
