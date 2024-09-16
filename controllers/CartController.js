const Cartproducts= require("../Models/Cart");
const fetchCartProducts=async(req,res)=>{
    try {
        let data = await Cartproducts.find();
        res.status(200).json({ success: true, items: data });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}
const addCartProduct = async (req, res) => {
    try{
        
         console.log(req.body)
          const {id,title,src,Previous,Current,discount,quantity} = req.body;
          const existingProduct = await Cartproducts.findOne({ id });

          if (existingProduct) {
              // If a product with the same id already exists, return an error
              return res.status(400).json({ success: false, message: "Product with this id already exists" });
          }
          const newCartProduct = await Cartproducts.create({
                        id,
                        title,
                        src,
                        Previous,
                        Current,
                        discount,
                        quantity
                    });
                    res.status(201).json({ success: true, message: "Cart product added successfully", item: newCartProduct })  
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add Cart product", error: error.message });
    }
}
const deleteCartProduct = async (req, res) => {
    try {
        const product = await Cartproducts.findOneAndDelete({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to delete wishlisted product", error: err.message });
    }
};
module.exports={getCartProduct:fetchCartProducts,
    addCartProduct,
    deleteCartProduct 
}