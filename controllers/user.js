const User = require("../models/user");

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) =>{
        if(err||!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    });
};

//for user to read their own profile

exports.read=(req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

//making the above two sensitive parameters undefined

    return res.json(req.profile);      // we can use this because we have saved the user data in the above userById section *** req.profile = user ***
}


//for user to update their ids and password
exports.update=(req,res)=>{

    //the *** set *** field will take the input from the req body and will update everything that has been requested like name, email and password
    //the  **** new : true ***** field sends the newly updated record as the JSON response!!(will have to look i am quoting RYAN DUGGAL)
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true},(err,user)=>{
        if(err){
            return res.status(400).json({
                error : "You are authorized to perform this action"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.json(user);
    });
    
};