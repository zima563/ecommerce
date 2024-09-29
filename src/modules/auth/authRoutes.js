const express = require("express");
const {
  allowedTo,
  changePassword,
  checkpinCode,
  forgettingPassword,
  logout,
  protectRoutes,
  resetPassword,
  signin,
  signup,
} = require("./authControllers.js");
const validation = require("../../middleware/validation.js");
const {
  changePasswordValidator,
  checkpinCodeValidator,
  forgettingPasswordValidator,
  resetPasswordValidator,
  signinValidator,
  signupValidator,
} = require("./authValidators.js");
const emailExist = require("../../middleware/emailExist.js");

const authRouter = express.Router();

authRouter
  .route("/signup")
  .post(validation(signupValidator), emailExist, signup);
authRouter.route("/signin").post(validation(signinValidator), signin);
authRouter
  .route("/forgettingPassword")
  .post(validation(forgettingPasswordValidator), forgettingPassword);
authRouter
  .route("/checkpinCode")
  .post(validation(checkpinCodeValidator), checkpinCode);
authRouter
  .route("/resetPassword")
  .post(validation(resetPasswordValidator), resetPassword);
authRouter
  .route("/changePassword")
  .patch(
    protectRoutes,
    allowedTo("admin", "user"),
    validation(changePasswordValidator),
    changePassword
  );
authRouter
  .route("/logOut")
  .patch(protectRoutes, allowedTo("admin", "user"), logout);

module.exports = { authRouter };
