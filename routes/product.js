const express=require('express');
const router=express.Router();
console.log("product router");
const { userById }=require('../controllers/user');
const { requireSignin , isAdmin, isAuth}=require('../controllers/auth');
const { createProduct, getallproduct, deletproduct, updateProduct, getProductByName, getProductbyCategory }= require('../controllers/product');

router.post("/createProduct/:userId",requireSignin , isAdmin, isAuth, createProduct);
router.get("/getallproduct",getallproduct);
router.get("/getProductbyCategory/:categoryId",getProductbyCategory);
router.get("/getProductByName/:name",getProductByName);
router.delete("/deletproduct/:userId/:productId",requireSignin , isAdmin, isAuth, deletproduct);
router.put("/updateProduct/:userId/:productId",updateProduct);
router.param("userId", userById);
module.exports=router;
