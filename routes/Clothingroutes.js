const express = require("express");
const router = express.Router();
const middleware=require("../MiddleWare/middleware")
const {MenTopwear, MenBottomwear, WomenTopwear,WomenBottomwear,MenFootwear,WomenFootwear, KidsBottomwear, KidsTopwear,
     KidsFootwear, getProduct,menProducts,womenProducts,NewProduct} = require("../controllers/ClothingController");

router.route("/").get(middleware,MenTopwear);
router.route("/bottom").get(middleware,MenBottomwear);
router.route("/womenTopwear").get(middleware,WomenTopwear)
router.route("/Bottomwear").get(middleware,WomenBottomwear)
router.route("/MenFootwear").get(middleware,MenFootwear)
router.route("/Footwear").get(middleware,WomenFootwear)
router.route("/api/kidsFootwear").get(middleware,KidsFootwear)
router.route("/KidsTopwear").get(middleware,KidsTopwear)
router.route("/KidsBottomwear").get(middleware,KidsBottomwear)
router.route("/menProducts").get(middleware,menProducts)
router.route("/menProducts/:id").get(middleware,getProduct)
router.route("/womenProducts").get(middleware,womenProducts)
router.route("/womenProducts/:id").get(middleware,getProduct)
router.route("/NewProduct").post(NewProduct)
module.exports = router;
