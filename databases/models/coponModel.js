const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    discount: {
      type: Number,
      required: true,
    },
    expire: Date,
    code: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const couponModel = mongoose.model("copon", schema);

module.exports = couponModel;