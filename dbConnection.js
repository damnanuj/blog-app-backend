const clc = require("cli-color");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(clc.blueBright.bold("MongoDb connected successfully"));
  })
  .catch((error) => {
    console.log(clc.redBright.bold(error));
  });
