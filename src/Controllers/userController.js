const catchAsyncError = require("../Utils/catchAsyncError");
const User = require("../Models/userModel");
const sendToken = require("../Utils/jwtToken");
const ErrorHandle = require("../Utils/ErrorHandle");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { first_name, last_name, email, mobile, password, role } = req.body;
  const user = await User.create({
    first_name,
    last_name,
    email,
    mobile,
    password,
    role,
  });
  res
    .status(200)
    .json({ success: true, message: "Account successfully created" });
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandle("Invalid email or password or role", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }
  const userRole = user.role === role;
  if (!userRole) {
    return next(new ErrorHandle("Invalid role", 401));
  }
  sendToken(user, 200, res, "Logged successfully");
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});
