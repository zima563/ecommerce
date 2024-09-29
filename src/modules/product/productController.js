const productModel = require("../../../databases/models/productModel.js");
const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addProduct = addOne(productModel);

const getProducts = getAll(productModel, "product");

const getProduct = getOne(productModel);

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

module.exports = { addProduct, getProduct, getProducts, updateProduct, deleteProduct };
