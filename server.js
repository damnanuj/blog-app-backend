const clc = require("cli-color");
const express = require("express");
require("dotenv").config();
const db = require("./dbConnection");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const cors = require("cors");
//file imports
const authRouter = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const isAuth = require("./middlewares/isAuthMiddleware");
const followRouter = require("./routers/followRouter");
const cleanUpBin = require("./cron");
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
const app = express();

// Allow requests from http://localhost:3000
app.use(cors({
  origin: "http://localhost:3000",
}));

const store = new mongodbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// middlewares
app.use(express.json()); //body parser json format POSTMAN
app.use(express.urlencoded({ extended: true })); //body parser url
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

//  /auth/login => /auth/register
app.use("/auth", authRouter);
app.use("/blog", isAuth, blogRouter);
app.use("/follow", isAuth, followRouter);

// app.get("/",(req,res)=>{
//     res.send("Server is running")
// })

app.listen(PORT, () => {
  console.log(clc.yellowBright.bold(`Server is running on PORT : ${PORT}`));
  cleanUpBin();
});
