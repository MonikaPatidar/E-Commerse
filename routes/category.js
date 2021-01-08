const express = require("express");
const router = express.Router();

const { create, getallcategory, updatecategory, deleteCategory, getcategory, getCategoryByName } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/getallcategory",getallcategory);
router.get("/getCategoryByName/:name",getCategoryByName);
router.get("/getcategory/:categoryid",getcategory);
router.put("/updatecategory/:userId/:categoryid",requireSignin, isAuth, isAdmin,updatecategory);
router.delete("/deleteCategory/:userId/:categoryid",requireSignin, isAuth, isAdmin,deleteCategory)
router.param("userId", userById);

module.exports = router;
