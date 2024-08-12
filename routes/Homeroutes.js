const express = require("express");
const router = express.Router();

const { homeProducts, womenProducts } = require("../controllers/HomeController");

router.route('/').get(homeProducts);
router.route('/women').get(womenProducts);

module.exports = router;
