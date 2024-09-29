const express = require("express");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");
const validation = require("../../middleware/validation.js");
const {
  createCashOrderCartVal,
  createCheckOutSessionsVal,
} = require("./orderValidators.js");
const {
  createCashOrderCart,
  createCheckOutSessions,
  getAllOrders,
  getSpecificOrder,
} = require("./orderController.js");

const orderRouter = express.Router();

orderRouter
  .route("/:id")
  .post(
    protectRoutes,
    allowedTo("user"),
    validation(createCashOrderCartVal),
    createCashOrderCart
  );
orderRouter
  .route("/checkOut/:id")
  .post(
    protectRoutes,
    allowedTo("user"),
    validation(createCheckOutSessionsVal),
    createCheckOutSessions
  );
orderRouter
  .route("/getSpecificOrder")
  .get(protectRoutes, allowedTo("user"), getSpecificOrder);
orderRouter
  .route("/allOrders")
  .get(protectRoutes, allowedTo("admin"), getAllOrders);

module.exports = { orderRouter };
