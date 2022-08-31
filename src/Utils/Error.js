const ErrorHandle = require("./ErrorHandle");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  if (err.message === "castError") {
    const message = `Resource not found. Invalid:${err.path}`;
    err = new ErrorHandle(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandle(message, 400);
  }

  //jwt error
  if (err.code === "jsonWebTokenError") {
    const message = `wrong token`;
    err = new ErrorHandle(message, 400);
  }
  if (err.code === "TokenExpiredError") {
    const message = `jwt token expired`;
    err = new ErrorHandle(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
