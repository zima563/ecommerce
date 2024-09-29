const express = require("express");

const validation = require("../../middleware/validation.js");
const { addAddresstVal, removeFromAddresstVal } = require("./addressValidators.js");
const {
  addToAddress,
  getLoggedUserAddresses,
  removeFromaddress,
} = require("./addressController.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(
    protectRoutes,
    allowedTo("user"),
    validation(addAddresstVal),
    addToAddress
  )
  .get(protectRoutes, allowedTo("user"), getLoggedUserAddresses);

addressRouter
  .route("/:id")
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(removeFromAddresstVal),
    removeFromaddress
  );

module.exports = { addressRouter };
