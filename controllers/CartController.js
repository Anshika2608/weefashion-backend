const Cartproducts= require("../Models/Cart");
const fetchCartProducts=async(req,res)=>{
    try {
        const { email } = req.query; 

        if (!email) {
          return res.status(400).json({ success: false, message: "Email is required" });
        } 
        let data = await Cartproducts.find({email});
        res.status(200).json({ success: true, items: data });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}
const addCartProduct = async (req, res) => {
    try{
        
         console.log(req.body)
          const {id,title,src,Previous,Current,discount,quantity,email} = req.body;
          const existingProduct = await Cartproducts.findOne({ id ,email});
          if (existingProduct) {
              return res.status(400).json({ success: false, message: "Product with this id already exists" });
          }
          const newCartProduct = await Cartproducts.create({
                        id,
                        title,
                        src,
                        Previous,
                        Current,
                        discount,
                        quantity,
                        email
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
        const { email } = req.query; 

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        const product = await Cartproducts.findOneAndDelete({ id: req.params.id,email });
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