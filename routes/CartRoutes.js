const express = require("express");
const router = express.Router();
const {getCartProduct,addCartProduct ,deleteCartProduct } = require("../controllers/CartController");
router.route("/").get(getCartProduct);
router.route("/addCart").post(addCartProduct);
router.route("/deleteCart/:id").delete(deleteCartProduct)
module.exports=router