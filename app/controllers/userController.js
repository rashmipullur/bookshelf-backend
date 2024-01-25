const User = require("../models/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    let { username, password } = req.body;
    if (!username || !password)
      return req.status(401).send({ message: "All fields are required!" });

    // const userExists = await User.findOne({ username });
    // if (userExists)
    //   return res.status(401).send({ message: "User Exists. Please Sign In." });

    if (password.length < 8 || password.length > 16) {
      return res.status(400).send({
        status: false,
        message: "Invalid password!",
        data: {},
      });
    } else {
      const salt = genSaltSync(10);
      password = hashSync(password, salt);
    }

    const userData = await new User({ username, password }).save();

    if (!userData)
      return res.status(401).send({ message: "could not save data" });

    return res
      .status(200)
      .send({ message: "User Registered!", page: "/login" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Something went wrong!",
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {


    //genrate JWT token and store session data
    const token = await createSessionAndJwtToken(result)

    
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Something went wrong!",
      data: {},
    });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Something went wrong!",
      data: {},
    });
  }
};

module.exports = { registerUser, login, deleteUser };
