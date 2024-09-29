const { brandModel } = require("../../../databases/models/brandModel.js");
const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addBrand = addOne(brandModel);

const getBrands = getAll(brandModel, "brand");

const getBrand = getOne(brandModel);

const updateBrand = updateOne(brandModel);

const deleteBrand = deleteOne(brandModel);

module.exports = { addBrand, getBrand, getBrands, updateBrand, deleteBrand };
