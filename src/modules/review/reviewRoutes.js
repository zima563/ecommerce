const express = require("express");

const validation = require("../../middleware/validation.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");
const {
  addReviewVal,
  paramsVal,
  updateReviewVal,
} = require("./reviewValidators.js");
const {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} = require("./reviewController.js");
const isReviewExist = require("../../middleware/reviewExist.js");

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("user"),
    isReviewExist,
    validation(addReviewVal),
    addReview
  )
  .get(getReviews);

reviewRouter
  .route("/:id")
  .get(validation(paramsVal), getReview)
  .put(
    protectRoutes,
    allowedTo("user"),
    validation(updateReviewVal),
    updateReview
  )
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    deleteReview
  );

module.exports = { reviewRouter };
