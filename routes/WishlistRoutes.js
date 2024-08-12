const express = require("express");
const router = express.Router();
const { wishlist,liked, deleteWishlist } = require("../controllers/WishlistController");
router.route("/").get(wishlist);
router.route("/liked").post(liked);
router.route("/delete/:id").delete(deleteWishlist)

module.exports=router