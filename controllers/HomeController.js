const aysncHandler = require("express-async-handler");
const Product = require("../Models/Product");

const fetchHomeProducts = async (req, res) => {
  try {
    let data = await Product.find({ Latest: true });
    res.status(200).json({ success: true, products: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const fetchWomenProducts=async(req,res)=>{
    try {
        let data = await Product.find({ gender: "Women" }).limit(4);
        res.status(200).json({ success: true, products: data });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}

// const fetchHomeProducts = aysncHandler(async((req, res) => {
//     try {
//         let data = await Product.find({ Latest: true });
//         res.status(200).json({ success: true, data: data })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// }))

module.exports = { homeProducts: fetchHomeProducts,womenProducts: fetchWomenProducts };
