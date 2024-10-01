const productModel = require("../../../databases/models/productModel.js");
const reviewModel = require("../../../databases/models/reviewModel.js");
const catchError = require("../../middleware/catchError.js");
const apiError = require("../../utils/apiError.js");
const { getAll, getOne, updateOne, deleteOne } = require("../handlers/handler.js");

const addReview = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  !product && next(new apiError("product not found", 401));

  let review = new reviewModel(req.body);
  review.product = req.params.id;
  review.user = req.user._id;
  await review.save();

  let ratingQuantity = product.ratingQuantity + 1;
  let ratingAverage = ((product.ratingAverage * product.ratingQuantity) + review.rate) / ratingQuantity;

  await productModel.findByIdAndUpdate(req.params.id, { ratingAverage, ratingQuantity });
  res.json({ msg: "success", review })
});

const getReviews = getAll(reviewModel, "review");

const getReview = getOne(reviewModel);

const updateReview = updateOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

module.exports = { addReview, getReviews, getReview, updateReview, deleteReview };
