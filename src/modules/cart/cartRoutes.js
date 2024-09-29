const express = require("express");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");
const validation = require("../../middleware/validation.js");
const { addCartVal, paramsVal, updateQTYVal } = require("./cartValidators.js");
const {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeItemFromCart,
  updateQTY,
} = require("./cartController.js");

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectRoutes, allowedTo("user"), validation(addCartVal), addToCart)
  .get(protectRoutes, allowedTo("user"), getLoggedUserCart)
  .delete(protectRoutes, allowedTo("user"), clearUserCart);

cartRouter
  .route("/applyCoupon")
  .post(protectRoutes, allowedTo("user"), applyCoupon);
cartRouter
  .route("/:id")
  .put(protectRoutes, allowedTo("user"), validation(updateQTYVal), updateQTY)
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    removeItemFromCart
  );

module.exports = { cartRouter };
