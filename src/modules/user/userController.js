const slugify = require("slugify");

const catchError = require("../../middleware/catchError.js");
const apiError = require("../../utils/apiError.js");
const { deleteOne } = require("../handlers/handler.js");
const ApiFeatures = require("../../utils/apiFeatures.js");
const userModel = require("../../../databases/models/userModel.js");

const addUser = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let user = new userModel(req.body);
  await user.save();
  res.json({ msg: "success", user });
});

const getUsers = catchError(async (req, res, next) => {
  let countDocuments = await userModel.countDocuments();
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate(countDocuments)
    .filter()
    .sort()
    .search()
    .limitedFields();

  const { mongooseQuery, paginationResult } = apiFeatures;
  let users = await mongooseQuery;
  res.json({ msg: "success", paginationResult, users });
});

const getUser = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  !user && next(new apiError("not user found", 404));
  user && res.json({ msg: "success", user });
});

const updateUser = catchError(async (req, res, next) => {
  // if (req.body.name) req.body.slug = slugify(req.body.name);
  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !user && next(new apiError("not user found", 404));
  user && res.json({ msg: "success", user });
});

const deleteUser = deleteOne(userModel);

module.exports = { addUser, getUser, getUsers, updateUser, deleteUser };
