const slugify = require("slugify");
const catchError = require("../../middleware/catchError.js");
const apiError = require("../../utils/apiError.js");
const ApiFeatures = require("../../utils/apiFeatures.js");
const reviewModel = require("../../../databases/models/reviewModel.js");

const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};

const updateOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.files?.imgCover) {
      req.body.imgCover = req.files.imgCover[0].filename;
    }
    if (req.files?.images) {
      req.body.images = req.files.images.map((val) => val.filename);
    }
    if (model == reviewModel) {
      let document = await model.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        {
          new: true,
        }
      );
      !document && next(new apiError("not document found", 404));
      document && res.json({ msg: "success", document });
    }
    let document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};

const addOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.params.category) req.body.category = req.params.category;
    if (req.file) req.body.image = req.file.filename;

    if (req.files?.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
    if (req.files?.images)
      req.body.images = req.files.images.map((val) => val.filename);
    let document = new model(req.body);

    await document.save();
    res.json({ msg: "success", document });
  });
};

const getAll = (model, modelName) => {
  return catchError(async (req, res, next) => {
    let filterObj = {};
    if (req.params.category) {
      filterObj.category = req.params.category;
    }
    let countDocuments = await model.countDocuments().maxTimeMS(30000);
    let apiFeatures = new ApiFeatures(model.find(filterObj), req.query)
      .paginate(countDocuments)
      .filter()
      .sort()
      .search(modelName)
      .limitedFields();

    const { mongooseQuery, paginationResult } = apiFeatures;
    let document = await mongooseQuery;
    res.json({ msg: "success", paginationResult, document });
  });
};

const getOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};

module.exports = {
  updateOne,
  deleteOne,
  getOne,
  getAll,
  addOne
}