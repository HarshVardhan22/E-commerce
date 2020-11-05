const mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        maxlength : 32,
        trim : true // trim is used to delete the spaces before the input
    },
    description:{
        type : String,
        required : true,
        maxlength : 2032,
        trim : true // trim is used to delete the spaces before the input
    },
    price:{
        type : Number,
        required : true,
        maxlength : 32,
        trim : true // trim is used to delete the spaces before the input
    },
    category:{
        type : ObjectId,
        ref : 'Category',
        required : true
        
        // trim is used to delete the spaces before the input
    },
    quantity:{
        type : Number,
    },
    photo:{
        data : Buffer,
        contentType : String
    },
    shipping: {

        type : Boolean
        //may add this feature
        // to check whether shipping is available in that location or not .Or to give the option to the user to download an e-book.
    }

},{timestamps:true})


module.exports = mongoose.model("Product", productSchema);
