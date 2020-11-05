const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { error } = require('console');

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({  
                error: 'Image could not be uploaded'
            })
        }
        let product = new Product(fields)

        if(files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:"cant save product"
                })
            }
            res.json(result);
        })
    })
}