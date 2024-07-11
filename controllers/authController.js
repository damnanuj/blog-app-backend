const { userDataValidation } = require("../utills/authUtill");

const loginController = (req, res) => {
  console.log("Login Working");
  res.send("Login api is working");
};


const registerController =async (req, res) => {
  console.log("register Working");
  const {name, username, email,passowrd} = req.body;

  // data Validation 
  try {
    await userDataValidation({name, username, email,passowrd})
  } catch (error) {
    res.send({
      status:400,
      message:error,
      error:error
    })
  }
  res.send("Register api is working");
};

module.exports ={loginController, registerController}