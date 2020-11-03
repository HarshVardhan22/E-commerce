const mongoose  = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true,
            maxlength : 32,
            trim : true // trim is used to delete the spaces before the input
        }
    },
    {timestamps:true}
);



//Now exporting the created userSchema by the name of User so that we can create multiple users in pur webapp

module.exports = mongoose.model("Category", categorySchema);



