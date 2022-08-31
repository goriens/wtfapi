require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: uuidv4(13),
  },
  first_name: {
    type: String,
    required: [true, "Please Enter Your First Name"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Sorry, Email is Not Valid"],
  },
  mobile: {
    type: Number,
    unique: true,
    required: [true, "Please Enter Your Mobile Number"],
    minLength: [10, "Mobile Number length Minimum 10 characters required"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password length Minimum 8 characters required"],
    validate: [
      validator.isStrongPassword,
      "Please Enter At least One capital  & special character",
    ],
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: "member",
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 30,
  });
};

// Compare pass
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
