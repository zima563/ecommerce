const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.MODE == "PROD") {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    // if (res.headersSent) {
    //   return next(err);
    // }
    res.status(err.statusCode).json({ error: err.message, stack: err.stack });
  }
};

module.exports = globalError;