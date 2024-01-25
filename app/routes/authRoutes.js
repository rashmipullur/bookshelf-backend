const express = require("express");
const passport = require("passport");
const { authUser, logout } = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", authUser, userController.login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

module.exports = router;
