const express = require("express");

const validation = require("../../middleware/validation.js");
const { addUserVal, paramsVal, updateUserVal } = require("./userValidators.js");
const {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require("./userController.js");
const emailExist = require("../../middleware/emailExist.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const userRouter = express.Router();
// userRouter.use(protectRoutes, allowedTo("admin"));
userRouter
  .route("/")
  .post(validation(addUserVal), emailExist, addUser)
  .get(getUsers);

userRouter
  .route("/:id")
  .get(validation(paramsVal), getUser)
  .put(validation(updateUserVal), updateUser)
  .delete(validation(paramsVal), deleteUser);

module.exports = { userRouter };
