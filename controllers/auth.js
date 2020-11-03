const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

//imports for sign in:
const jwt = require("jsonwebtoken"); //to generate token
const expressJwt = require("express-jwt"); //for authorization check

exports.signup = (req, res) => {
  //we are able to get req.body we installed the body-parse package

  console.log("req.body", req.body);

  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error : "User with that email does not exist! Please Sign Up.",
      });
    }
     
    //if the user is found the match it with the existing email and password db
    //our password in the db is stored in hashed format and the password we will be getting from body will be in normal format.
    //therefore we must hash the password before matching and this will be done by using the same method that was used in ../models/users
    
      if(!user.authenticate(password)){
          return res.status(400).json({
              error  : "Email and password do not match!"
          })
      }
      //generate a token   
      const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
      //persist the token as "t" in cookie with expiry date
      res.cookie("t",token, {expire: new Date() + 9999});
      //return the response with user and token to the front end client
      const{_id,name,email,role} = user;
      return res.json({token, user:{_id,email,name,role}});
    
  });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Sign Out Successful"})
}  

//this method below will help to allow access to any particular page to only signed in users.
//It checks by using the atribute "secret".
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

// isAuth function will be used to prevent any user to accessing the deatils of other users
exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if(!user){
    return res.status(403).json({
      error: "Unauthorized Access to another account"
    });
  }
  next();
}

// isAdmin will check if the user is admin or not
exports.isAdmin = (req,res,next)=>{
 
  if(req.profile.role == 0){
    return res.status(403).json({
      error:"Admin Resource, Access Denied!"
    });
  }
  next();
}