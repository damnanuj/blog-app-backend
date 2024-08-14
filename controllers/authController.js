const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { userDataValidation } = require("../utills/authUtill");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");



// Registration api controller
const registerController = async (req, res) => {
  console.log("register Working");
  const { name, username, email, password } = req.body;

  // data Validation
  try {
    await userDataValidation({ name, username, email, password });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
      error: error,
    });
  }
  //store user data
  const obj = new User({ name, email, username, password });
  try {
    const userDb = await obj.registerUser();

    // Generate JWT Token
    const token = jwt.sign(
      { id: userDb._id, username: userDb.username },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.send({
      status: 201,
      message: "User registered successfully",
      token: token,
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

// Login api controller
const loginController = async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).send({
      message: "Missing user credentials",
    });
  }

  try {
    const user = await User.findUserWithKey({ key: loginId });

    if (!user) {
      return res.status(400).send({
        message: "Invalid username or password",
      });
    }

    const isPassMatched = password === user.password; 
    //TODO: Replace with bcrypt.compare for security

    if (!isPassMatched) {
      return res.status(400).send({
        message: "Invalid username or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    console.log("User login successfully");

    return res.send({
      status: 200,
      message: "User login successfully",
      token: token,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};


const logoutController = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token');

  return res.status(200).send({
    status: 200,
    message: "Logout successful",
  });
};

module.exports = logoutController;


// Logout alldevices controller
const logoutAllDeviceController = async (req, res) => {
  const userId = req.session.user.userId;

  //create a session schema
  const sessionSchema = new Schema({ _id: String }, { strict: false });
  //convert it into model
  const sessionModel = mongoose.model("session", sessionSchema);
  //mongoose query to delete all the related entries
  try {
    const deletedSessions = await sessionModel.deleteMany({
      "session.user.userId": userId,
    });
    console.log("Line 115", deletedSessions);
    res.send({
      status: 200,
      message: `Logout from ${deletedSessions.deletedCount} devices successfull`,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
  console.log("Logout from all devices successfull");
};

module.exports = {
  loginController,
  registerController,
  logoutController,
  logoutAllDeviceController,
};
