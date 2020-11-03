const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressValidator = require("express-validator");// to use validation of terms like name email id or password by using predefined functions in the package
const cookieParser = require("cookie-parser");//to store all the user credentials in cookies
//to load all the cofiguration in .env file
require("dotenv").config();

//importing router from user.js
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const dotenv = require('dotenv');
const app =express();

// To connect to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connected"));

// using the get function to get request and send response to the server
// app.get("/", (req,res)=>{
//     res.send("Hello from node !");
// })


//middleWares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator()); 

//using the imported routes
app.use('/api', authRoutes)
app.use('/api', userRoutes) // "/api" is used just as a convention as multiple routes will be ther in user.js
app.use('/api', categoryRoutes)

// selecting the port defined in the .env file
const port = process.env.PORT||8000;

//starting the server
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})