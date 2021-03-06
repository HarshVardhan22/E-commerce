const express = require("express");

const router = express.Router();

const {create, productById, read, list, remove, photo, update, listCategories, listRelated, listBySearch} = require("../controllers/product");

const { userById} = require("../controllers/user");

const {requireSignin, isAuth ,isAdmin} = require("../controllers/auth");

router.get("/products/categories", listCategories);
router.get("/product/:productId",read);
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,create); 
router.delete("/product/:productId/:userId/",requireSignin,isAuth,isAdmin,remove);
router.put("/product/:productId/:userId/",requireSignin,isAuth,isAdmin,update);
router.get("/products",list);
router.get("/products/related/:productId", listRelated)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;