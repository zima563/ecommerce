const Joi = require("joi");

const addwishListVal = Joi.object({
  product: Joi.string().length(24).hex().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const removeFromwishListVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

module.exports = { addwishListVal, paramsVal, removeFromwishListVal };
