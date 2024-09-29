const express = require("express");

const { addBrandVal, paramsVal, updateBrandVal } = require("./brandValidators.js");
const validation = require("../../middleware/validation.js");
const {
  addBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} = require("./brandController.js");
const { uploadSingleFile } = require("../../services/fileUpload/upload.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo"),
    validation(addBrandVal),
    addBrand
  )
  .get(getBrands);

brandRouter
  .route("/:id")
  .get(validation(paramsVal), getBrand)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo"),
    validation(updateBrandVal),
    updateBrand
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteBrand
  );

module.exports = { brandRouter };
