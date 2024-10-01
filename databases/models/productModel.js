const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "name is required"],
      minlength: [2, "Too short name"],
      maxlength: [100, "Too long name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "name is required"],
      minlength: [2, "Too short name"],
      maxlength: [1000, "Too long name"],
    },
    sold: Number,
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      max: [10000000, "too much price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    imgCover: String,
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    ratingAverage: {
      type: Number,
      min: 0,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

schema.post("init", (doc) => {
  if (doc.imgCover || doc.images) {
    doc.imgCover = process.env.BASE_URL + doc.imgCover;
    doc.images = doc.images?.map((val) => process.env.BASE_URL + val);
  }
});

schema.virtual("myReviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});

schema.pre("findOne", function () {
  this.populate("category");
  this.populate("subcategory");
  this.populate("brand");
  this.populate("myReviews");
});

schema.pre("find", function () {
  this.populate("category");
  this.populate("subcategory");
  this.populate("brand");
  this.populate("myReviews");
});
const productModel = mongoose.model("product", schema);

module.exports = productModel;