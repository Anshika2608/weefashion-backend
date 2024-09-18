const express = require("express");
const { addressDetails } = require("../controllers/OrderPlaceController");
const router = express.Router();
router.post("/",addressDetails)
module.exports=router