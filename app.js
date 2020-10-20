const express = require("express");
const mongoose = require("mongoose");

//to load all the cofiguration in .env file
require("dotenv").config();
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
app.get("/", (req,res)=>{
    res.send("Hello from node !");
})

// selecting the port defined in the .env file
const port = process.env.PORT||8000;

//starting the server
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})