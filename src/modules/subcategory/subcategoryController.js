const { subcategoryModel } = require("../../../databases/models/subcategoryModel.js");
const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("../handlers/handler.js");

const addsubcategory = addOne(subcategoryModel);

const getSubcategories = getAll(subcategoryModel);

const getSubcategory = getOne(subcategoryModel);

const updateSubcategory = updateOne(subcategoryModel);

const deleteSubcategory = deleteOne(subcategoryModel);

module.exports = {
  addsubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
