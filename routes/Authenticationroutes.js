const express=require('express')
const router = express.Router();
const {addUsers,loginUser,validUser,logoutUser, sendemaillink,verifyForgot,changePassword} = require("../controllers/AuthenticationController");
const authenticate=require("../MiddleWare/authenticate")
router.route("/").post(addUsers);
router.route("/login").post(loginUser);
router.route("/validuser").get(authenticate, validUser);
router.route("/sendpasswordLink").post(sendemaillink)

router.route("/ForgotPassword/:id/:token").get(verifyForgot)
router.route("/:id/:token").post(changePassword)
router.route("/logout").get(authenticate,logoutUser)
module.exports=router;