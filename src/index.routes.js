const globalError = require("./middleware/globalError.js");
const { addressRouter } = require("./modules/address/addressRoutes.js");
const { authRouter } = require("./modules/auth/authRoutes.js");
const { brandRouter } = require("./modules/brand/brandRoutes.js");
const { cartRouter } = require("./modules/cart/cartRoutes.js");
const { categoryRouter } = require("./modules/category/categoryRoutes.js");
const { couponRouter } = require("./modules/coupon/couponRoutes.js");
const { createOnlineOrder } = require("./modules/order/orderController.js");
const { orderRouter } = require("./modules/order/orderRoutes.js");
const { productRouter } = require("./modules/product/productRouters.js");
const { reviewRouter } = require("./modules/review/reviewRoutes.js");
const { subcategoryRouter } = require("./modules/subcategory/subcategoryRoutes.js");
const { userRouter } = require("./modules/user/userRoutes.js");
const { wishListRouter } = require("./modules/wishlist/wishlistRoutes.js");
const apiError = require("./utils/apiError.js");
const express = require("express");
const cors = require("cors");

exports.bootstrap = (app) => {

  app.use(cors());
  app.use('/webhook', express.raw({ type: 'application/json' }), createOnlineOrder);
  app.use(express.json());
  app.use("/", express.static("uploads"));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);

  //   app.use("/", (req, res, next) => {
  //   res.json({ msg: "hello world" });
  // });

  app.use("*", (req, res, next) => {
    next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
  });

  app.use(globalError);
};
