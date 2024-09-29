const userModel = require("../../../databases/models/userModel.js");
const catchError = require("../../middleware/catchError.js");
const apiError = require("../../utils/apiError.js");

const addToAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  !address && next(new apiError({ msq: "not address found" }, 404));
  address && res.json({ msg: "success", address: address.addresses });
});

const removeFromaddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true }
  );
  !address && next(new apiError({ msq: "not address found" }, 404));
  address && res.json({ msg: "success", address: address.addresses });
});

const getLoggedUserAddresses = catchError(async (req, res, next) => {
  let { addresses } = await userModel.findById(req.user._id);
  addresses && res.json({ msg: "success", addresses });
});
module.exports = { addToAddress, removeFromaddress, getLoggedUserAddresses };
