const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { userDataValidation } = require("../utills/authUtill");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Login api controller
const loginController = async (req, res) => {
  const { loginId, password } = req.body;
  // console.log(req.body);
  if (!loginId || !password) {
    return res.send({
      status: 400,
      message: "Missing user credentials",
    });
  }
  //find the user
  try {
    const userDb = await User.findUserWithKey({ key:loginId });
    // console.log(userDb);
    //compare the password
    // const isPassMatched = await bcrypt.compare(password, userDb.password)
    const isPassMatched = password === userDb.password;
    if (!isPassMatched) {
      return res.send({
        status: 400,
        message: "Incorrect Passoword",
      });
    }
    req.session.isAuth = true;
    req.session.user = {
      username: userDb.username,
      email: userDb.email,
      userId: userDb._id,
    };
    console.log("User login successfully");
    return res.send({
      status: 200,
      message: "User login successfully",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

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
      message: error,
      error: error,
    });
  }

  //store user data
  const obj = new User({ name, email, username, password });
  try {
    const userDb = await obj.registerUser();

    return res.send({
      status: 201,
      message: "User registered successfully",
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

// Logout Controller
const logoutController = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send({
        status: 500,
        message: "Unable to logout",
      });
    }

    return res.send({
      status: 200,
      message: "Logout successfull",
    });
  });
};

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
