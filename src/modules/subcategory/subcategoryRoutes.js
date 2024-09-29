const express = require("express");

const {
  addSubcategoryVal,
  paramsVal,
  updateSubcategoyVal,
} = require("./subcategoryValidation.js");
const validation = require("../../middleware/validation.js");
const {
  addsubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("./subcategoryController.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const subcategoryRouter = express.Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    validation(addSubcategoryVal),
    addsubcategory
  )
  .get(getSubcategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsVal), getSubcategory)
  .put(
    protectRoutes,
    allowedTo("admin"),
    validation(updateSubcategoyVal),
    updateSubcategory
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteSubcategory
  );

module.exports = { subcategoryRouter };
