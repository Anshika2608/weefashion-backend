const wishlistItems = require("../Models/Wishlisted");
const fetchWishlistProducts = async (req, res) => {
    try {
        const { email } = req.body;  // Get the email from the request body

        if (!email) {
          return res.status(400).json({ success: false, message: "Email is required" });
        }
    
        const data = await wishlistItems.find({ email });  // Fetch wishlist items specific to the email
        res.status(200).json({ success: true, items: data });
        // let data = await wishlistItems.find();
        // res.status(200).json({ success: true, items: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
const addWishlistedProduct = async (req, res) => {
    try {
        // const userEmail = req.user.email
        // if(!userEmail){
        //     res.status(400).json({message:"User must be loggedIn"})
        // }
        console.log(req.body)
        const { id, title, src, Previous, Current, discount,email } = req.body;
        const existingProduct = await wishlistItems.findOne({ id });

        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Product with this id already exists" });
        }
        const newWishlistedProduct = await wishlistItems.create({
            id,
            title,
            src,
            Previous,
            Current,
            discount,
            email
        });
        res.status(201).json({ success: true, message: "Wishlisted product added successfully", item: newWishlistedProduct })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add wishlisted product", error: error.message });
    }
}

const deleteWishlistProduct = async (req, res) => {
    try {
        const product = await wishlistItems.findOneAndDelete({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to delete wishlisted product", error: err.message });
    }
};




module.exports = {
    wishlist: fetchWishlistProducts,
    liked: addWishlistedProduct,
    deleteWishlist: deleteWishlistProduct
};
