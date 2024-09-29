const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,
    img: String,
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

schema.post("init", (doc) => {
  doc.img = process.env.BASE_URL + doc.img;
  doc.images = doc.images.map((val) => process.env.BASE_URL + val);
});
const photoModel = mongoose.model("photo", schema);

module.exports = photoModel;