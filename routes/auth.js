//the route folder is containing routes to different things like user data, price, items etc

const express = require("express");

//Express router is a class which helps us to create router handlers. By router handler i mean to not just providing routing to our app but also can extend this routing to handle validation, handle 404 or other errors etc.
//https://codeforgeek.com/expressjs-router-tutorial/#:~:text=Express%20router%20is%20a%20class,404%20or%20other%20errors%20etc.


const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("Hello from user Route");
// });

//Instead of using the above hardcoded route to a certain section the data req or res is taken from controller

// **meaning of const {xxx} you can rewrite this

// const name = app.name;
// const version = app.version;
// const type = app.type;

// **************************as this

// const { name, version, type } = app;

const { signup , signin , signout , requireSignin} = require("../controllers/auth");

const {userSignupValidator} = require("../validator/index")

router.post("/signup", userSignupValidator, signup); //it means 'userSignupValidator' will be xecuted before 'signup'

router.post("/signin", signin);

router.get("/signout", signout);

  

module.exports = router;
