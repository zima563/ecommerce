const express = require("express");
const {
  addToWishList,
  getLoggedUserWishList,
  removeFromWishList,
} = require("./wishlistController.js");
const validation = require("../../middleware/validation.js");
const { addwishListVal, removeFromwishListVal } = require("./wishlistValidators.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .patch(
    protectRoutes,
    allowedTo("user"),
    validation(addwishListVal),
    addToWishList
  )
  .get(protectRoutes, allowedTo("user"), getLoggedUserWishList);

wishListRouter
  .route("/:id")
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(removeFromwishListVal),
    removeFromWishList
  );

module.exports = { wishListRouter };
