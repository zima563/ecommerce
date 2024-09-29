const express = require("express");

const {
  addProductVal,
  paramsVal,
  updateProductVal,
} = require("./productValidators.js");
const validation = require("../../middleware/validation.js");
const {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./productController.js");
const { uploadFieldsOfFiles } = require("../../services/fileUpload/upload.js");
const { allowedTo, protectRoutes } = require("../auth/authControllers.js");

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadFieldsOfFiles([
      { name: "imgCover", maxCounts: 1 },
      { name: "images", maxCounts: 10 },
    ]),
    validation(addProductVal),
    addProduct
  )
  .get(getProducts);

productRouter
  .route("/:id")
  .get(validation(paramsVal), getProduct)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadFieldsOfFiles([
      { name: "imgCover", maxCounts: 1 },
      { name: "images", maxCounts: 10 },
    ]),
    validation(updateProductVal),
    updateProduct
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteProduct
  );

module.exports = { productRouter };
