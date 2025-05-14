const express = require("express");
const router = express.Router();
const authenticate=require("../MiddleWare/authenticate")
const {getCartProduct,addCartProduct ,deleteCartProduct ,editQuantity,clearCart} = require("../controllers/CartController");
router.get("/",getCartProduct)
router.route("/addCart").post(addCartProduct);
router.route("/deleteCart/:id").delete(deleteCartProduct)
router.put("/editQuantity",authenticate,editQuantity)
router.delete('/clear', authenticate, clearCart);
module.exports=router