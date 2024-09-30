const express = require("express");
const {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} = require("./categoryController.js");
const {
  addCategoryVal,
  paramsIdVal,
  updateCategoryVal,
} = require("./categoryValidators.js");
const validation = require("../../middleware/validation.js");
const { uploadSingleFile } = require("../../services/fileUpload/upload.js");
const { subcategoryRouter } = require("../subcategory/subcategoryRoutes.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const categoryRouter = express.Router();

categoryRouter.use("/:category/subcategories", subcategoryRouter);

categoryRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("img"),
    validation(addCategoryVal),
    addCategory
  )
  .get(getCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getCategory)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("img"),
    validation(updateCategoryVal),
    updateCategory
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsIdVal),
    deleteCategory
  );

module.exports = { categoryRouter };
