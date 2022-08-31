const catchAsyncError = require("../Utils/catchAsyncError");
const ErrorHandle = require("../Utils/ErrorHandle");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.isAuthenticate = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandle("Please Login first", 401));
  }
  const decodeData = jwt.verify(token, "ifhreiufh9834h9845ufu4r834rh43h");
  req.user = await User.findById(decodeData.id);
  next();
});

exports.isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandle(
          `Role: ${req.user.role} is not allowed to access this route`,
          403
        )
      );
    }
    next();
  };
};
