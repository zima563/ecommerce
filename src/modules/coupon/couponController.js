const { couponModel } = require("../../../databases/models/coponModel.js");

const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addCoupon = addOne(couponModel);

const getCoupons = getAll(couponModel, "Coupon");

const getCoupon = getOne(couponModel);

const updateCoupon = updateOne(couponModel);

const deleteCoupon = deleteOne(couponModel);

module.exports = { addCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon };
