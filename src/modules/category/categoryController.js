const categoryModel = require("../../../databases/models/categoryModel.js");
const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addCategory = addOne(categoryModel);

const getCategories = getAll(categoryModel, "category");

const getCategory = getOne(categoryModel);

const updateCategory = updateOne(categoryModel);

const deleteCategory = deleteOne(categoryModel);

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
