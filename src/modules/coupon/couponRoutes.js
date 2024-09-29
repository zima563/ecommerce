const express = require("express");

const validation = require("../../middleware/validation.js");
const isCouponExist = require("../../middleware/couponExist.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");
const {
  addCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} = require("./couponController.js");
const {
  addCouponVal,
  paramsVal,
  updateCouponVal,
} = require("./couponValidators.js");

const couponRouter = express.Router();
couponRouter.use(protectRoutes, allowedTo("admin"));

couponRouter
  .route("/")
  .post(isCouponExist, validation(addCouponVal), addCoupon)
  .get(getCoupons);

couponRouter
  .route("/:id")
  .get(validation(paramsVal), getCoupon)
  .put(isCouponExist, validation(updateCouponVal), updateCoupon)
  .delete(validation(paramsVal), deleteCoupon);

module.exports = { couponRouter };
