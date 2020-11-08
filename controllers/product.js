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

    Product.find({_id:{$ne: req.product},category: req.product.category}) // ne = not included and we have used this bcz this a middleware to send the products related to product searched, therfore to prevent it from being sent twice we have used ne:productId of the product that is actually being searched
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

exports.listCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
           return res.status(400).json({
             error : "Category not found"
         })
     }

     res.json(category)

    })
}


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                //gte and lte are functions of mongodb
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    //the price that will be netered by the user in the front end is supposed to be an array of 2 numbers, symbolizing the price limit
                    //[0] means the starting limit of the price trag where as [1] means the ending limit.
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType) //set() is used to change the content type i.e from BINARY in this case to .jpeg or .png or etc
        return res.send(req.product.photo.data)
    }
    next();
}