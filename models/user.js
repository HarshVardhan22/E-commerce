const mongoose  = require("mongoose");
const crypto = require("crypto");//used for managing password field
const uuidv1 = require('uuid/v1');//used for generating unique ids
const { stringify } = require("querystring");
const { use } = require("../routes/user");

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        maxlength : 32,
        trim : true // trim is used to delete the spaces before the input
    },

    email:{
        type : String,
        unique : true,
        required : true,
        trim : true
    },

    hashed_password:{
        type: String, 
        required :true
    },

    about:{
        type: String,
        trim : true
    },

    salt : String,

    role : { //this attribute will be used to decide whether the sign in is done by User(code = 0) or Admin(1)
        type : String,
        default : 0
    },

    history:{
        type: Array,
        default : []
    }



},{timestamps})

//virtual field

userSchema.virtual("password")
          .set(function(password){
              this.password = password;
              this.salt = uuidv1();
              this.hashed_password = this.encryptPassword(password);
          })
          .get(function(){
              return this.password;
          });

//defining the above used function encryptPassword in set

userSchema.methods = {
    encryptPassword: function(password){
        if(!password)
            return "";
        try{//the syntax used below can be seen in the documentation of crypto
            return crypto
                        .createHmac("sha1",this.salt)
                        .update(password)
                        .digest("hex");
        } catch(err){
            return "";
        }

    }
};

//Now exporting the created userSchema by the name of User so that we can create multiple users in pur webapp

module.exports = mongoose.model("User", userSchema);



