const logger = require("../server");
const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("userId", "username");
    return res.json(books);
  } catch (err) {
    logger.error(`Error in getAllBooks: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBook = async (req, res) => {
  const { title, author } = req.body;
  const userId = req.user._id;
  try {
    const book = await new Book({ title, author, userId }).save();

    logger.info(`Book added successfully: ${book}`);
    return res.json({ message: "book added successfully", book });
  } catch (error) {
    logger.error(`Error in addBook: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBooks, addBook };
