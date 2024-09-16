const express = require("express");
const router = express.Router();
const authenticate=require("../MiddleWare/authenticate")
const {getCartProduct,addCartProduct ,deleteCartProduct } = require("../controllers/CartController");
router.get("/",getCartProduct)
router.route("/addCart").post(addCartProduct);
router.route("/deleteCart/:id").delete(deleteCartProduct)
module.exports=router