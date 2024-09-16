const express = require("express");
require("./config/config");
const cors = require("cors");
const cookieParser=require("cookie-parser")
const app = express();
app.use(express.json());

const path=require('path')

app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(cookieParser())
const port=process.env.PORT || 3000;

app.use("/api/home", require("./routes/Homeroutes"));
app.use("/api/Clothing",require("./routes/Clothingroutes"))
app.use("/api/wishlist",require("./routes/WishlistRoutes"))
app.use("/api/signup", require("./routes/Authenticationroutes"));
app.use("/api/login", require("./routes/Authenticationroutes"));
app.use("/api/validUser",require("./routes/Authenticationroutes"))
app.use("/api/logoutUser",require("./routes/Authenticationroutes"))
app.use("/api/changePassword",require("./routes/Authenticationroutes"))
app.use("/api/change",require("./routes/Authenticationroutes"))
app.use("/api/verifyForgot",require("./routes/Authenticationroutes"))
app.use("/api/cart",require("./routes/CartRoutes"))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
