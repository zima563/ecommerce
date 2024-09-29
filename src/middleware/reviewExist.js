const reviewModel = require("../../databases/models/reviewModel.js");
const apiError = require("../utils/apiError.js");

const isReviewExist = async (req, res, next) => {
  let isReviewExist = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReviewExist)
    return next(new apiError("you created review before", 409));

  next();
};

module.exports = isReviewExist;