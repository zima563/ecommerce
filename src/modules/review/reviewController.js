const reviewModel = require("../../../databases/models/reviewModel.js");
const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addReview = addOne(reviewModel);

const getReviews = getAll(reviewModel, "review");

const getReview = getOne(reviewModel);

const updateReview = updateOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

module.exports = { addReview, getReviews, getReview, updateReview, deleteReview };
