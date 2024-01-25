const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Required"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// user.pre("save", async function (next) {
//   try {
//     if (this.isModified("password") || this.isNew) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(this.password, salt);
//       this.password = hashedPassword;
//     }
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

// user.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const users = mongoose.model("users", user);
module.exports = mongoose.model("User", user);
