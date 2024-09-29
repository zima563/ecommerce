const couponModel = require("../../databases/models/coponModel.js");
const apiError = require("../utils/apiError.js");

const isCouponExist = async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({
    code: req.body.code,
  });
  if (isCouponExist)
    return next(new apiError("you created coupon before", 409));

  next();
};

module.exports = isCouponExist;