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
