const clc = require("cli-color")
const express = require("express")
const app = express()
require("dotenv").config()
const db = require("./dbConnection")

//file imports
const authRouter = require("./routers/authRouter")

 
const PORT =process.env.PORT

//  /auth/login
//  /auth/register
app.use("/auth", authRouter)
// app.get("/",(req,res)=>{
//     res.send("Server is running")
// })

app.listen(PORT, ()=>{
    console.log(clc.yellowBright.bold(`Server is running on PORT : ${PORT}`));
})