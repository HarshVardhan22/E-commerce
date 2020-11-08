const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");
const { request } = require('https');

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

exports.update = (req,res) => {
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

        let product = req.product;
        //will use the "LODASH _" extend() fn to update existing product
        product = _.extend(product,fields);

       
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

/**summon products on the basis of sell/arrival */
//sell = /products?sortBy=sold&order=desc&limit=4
//the above will show maximum sold products in descending order with a limit of 4per page
//arrival = /products?sortBy=createdAt&order=desc&limit=4
//the above will show newly added products in descending order with a limit of 4per page

//however no params are send then all products will be shown

exports.list=(req,res) =>{
    let order = req.query.order?req.query.order:'asc';
    let sortBy = req.query.sortBy?req.query.sortBy:'_id';
    let limit = req.query.limit?parseInt(req.query.limit):7;

    Product.find().select("-photo")
                  .populate('category')
                  .sort([[sortBy,order]])
                  .limit(limit)
                  .exec((err,products)=>{
                      if(err){
                          return res.status(400).json({
                              error:'Products not found'
                          })
                      }
                      res.json(products)
                  })
}

//it will find the products based on the req product category
//all the other products who are in the same categpry , e.g. smartphones will be summoned
//sounds like AI(elon musk flex) but it isnt! REALLY.
exports.listRelated =(req,res) =>{
    let limit = req.query.limit?parseInt(req.query.limit):6;

    Product.find({_id:{$ne: req.product},category: req.product.category})
           .limit(limit)
           .populate('category','_id name')
           .exec((err,products)=>{
               if(err){
                  return res.status(400).json({
                    error : "Products not found"
                })
            }

            res.json(products)

           })
}