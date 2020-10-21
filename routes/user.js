//the route folder is containing routes to different things like user data, price, items etc

const express = require("express");

const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("Hello from user Route");
// });

//Instead of using the above hardcoded route to a certain section the data req or res is taken from controller 
const {signup} = require("../controllers/user")

router.get("/signup",signup);

module.exports = router;