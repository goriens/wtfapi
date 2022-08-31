const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
} = require("../Controllers/userController");
const { isAuthenticate } = require("../Middleware/auth");

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/login").post(loginUser);
router.route("/user").get(isAuthenticate, getUserDetails);
router.route("/users").get(getAllUsers);

module.exports = router;
