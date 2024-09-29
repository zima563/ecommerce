const userModel = require("../../databases/models/userModel.js");
const apiError = require("../utils/apiError.js");

const emailExist = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) next(new apiError("email already exist", 409));
  next();
};

module.exports = emailExist;