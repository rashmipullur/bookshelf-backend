const express = require("express");
const passport = require("passport");
const bookController = require("../controllers/bookController");

const router = express.Router();

// GET all books
router.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  bookController.getAllBooks
);

// POST a new book
router.post(
  "/books",
  passport.authenticate("jwt", { session: false }),
  bookController.addBook
);

module.exports = router;
