require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const winston = require("winston");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Logging setup
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("db connection successful✌️"))
  .catch((err) => {
    console.log(err);
    console.log("💥error connection db");
  });

//   middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(compression());
app.use(cors());

// routes
app.use("/auth", authRoutes);
app.use("/api", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

// Export the logger
module.exports = logger;
