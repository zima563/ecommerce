const userModel = require("../../../databases/models/userModel.js");
const catchError = require("../../middleware/catchError.js");
const apiError = require("../../utils/apiError.js");

const addToWishList = catchError(async (req, res, next) => {
  let wishList = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishList: req.body.product } },
      { new: true }
    )
    .populate("wishList");
  !wishList && next(new apiError({ msq: "not product found" }, 404));
  wishList && res.json({ msg: "success", wishList: wishList.wishList });
});

const removeFromWishList = catchError(async (req, res, next) => {
  let wishList = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { wishList: req.params.id } },
      { new: true }
    )
    .populate("wishList");
  !wishList && next(new apiError({ msq: "not product found" }, 404));
  wishList && res.json({ msg: "success", wishList: wishList.wishList });
});

const getLoggedUserWishList = catchError(async (req, res, next) => {
  let { wishList } = await userModel
    .findById(req.user._id)
    .populate("wishList");
  !wishList && next(new apiError({ msq: "not product found" }, 404));
  wishList && res.json({ msg: "success", wishList });
});
module.exports = { addToWishList, removeFromWishList, getLoggedUserWishList };
