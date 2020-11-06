const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        
        // to check whether user the input product has all required criterias or not
        const {name,description,price,category,quantity,shipping} = fields;
        const {photo} = files;
        if(!name||!description||!price||!category||!quantity||!shipping||!photo){
            return res.status(400).json({
                error: "All fields are mandatory"
            });
        }

        let product = new Product(fields)

       
        if(files.photo) {
            if(files.photo.size > 10000000){
                return res.status(400).json({
                    error: "Image size should be less than 10MB"
                });
            }
            product.photo.data  = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            };
            res.json({ result })
        })

    })
};
//************end of CREATE function*********** */

exports.productById = (req,res,next,id) =>{
    Product.findById(id).exec((err,product)=>{
        if(err||!product){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    })
}

exports.read =(req,res) =>{
    req.product.photo = undefined; //we are doing this to improve performance and we will device a new route for imgs in order to maintain highspeed performance
    return res.json(req.product);

}

exports.remove = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if(err||!product){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            "message" : `Product: ${deletedProduct.name} deleted successfully`
            
        })
    })
}