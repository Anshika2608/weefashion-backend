const Product = require("../Models/Product");
const express = require("express");
const app = express();



const fetchMenTopwearProducts = async (req, res) => {
  try {
    let { company, Category, color } = req.query;

   
    let filter = { type: "Topwear", gender: "Men", ...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const fetchMenBottomwearProducts = async (req, res) => {
  try {
 
    let filter = { type: "Bottomwear", gender: "Men",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const fetchWomenTopwearProducts = async (req, res) => {
  try {
   
    let filter = { type: "Topwear", gender: "Women",...req.filter };
    let sort = req.sort || {};

    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchWomenBottomwearProducts = async (req, res) => {
  try {
  
    let filter = { type: "Bottomwear", gender: "Women",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchMenFootwearProducts = async (req, res) => {
  try { 
    let filter = { type: "Footwear", gender: "Men",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchWomenFootwearProducts = async (req, res) => {
  try {
    let filter = { type: "Footwear", gender: "Women",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchKidsFootwearProducts = async (req, res) => {
  try {
    let filter = { type: "Footwear", gender: "Kids",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchKidsTopwearProducts = async (req, res) => {
  try {
    let filter = { type: "Topwear", gender: "Kids",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const fetchKidsBottomwearProducts = async (req, res) => {
  try {
    let filter = { type: "Bottomwear", gender: "Kids",...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getProduct = async (req, res) => {
  try {
    const customId = req.params.id;
    const product = await Product.findOne({ id: customId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const menProducts = async (req, res) => {
  try {
    let data = await Product.find({gender:"Men"})
    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      // res.send(data)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const womenProducts = async (req, res) => {
  try {
    let data = await Product.find({gender:"Women"})
    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, products: data });
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const NewProduct = async (req, res) => {
  try {
    const { Title, company, gender, type, previous_price,  Current_price, discount } = req.body;
    if (!Title || !company || !gender || !type || previous_price === undefined || Current_price === undefined || !discount) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newProduct = new Product({
      Title,
      company,
      gender,
      type,
      previous_price: Number(previous_price), 
      Current_price: Number(Current_price),
      discount,
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully.', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};
module.exports = {
  MenTopwear: fetchMenTopwearProducts,
  MenBottomwear: fetchMenBottomwearProducts,
  WomenTopwear: fetchWomenTopwearProducts,
  WomenBottomwear: fetchWomenBottomwearProducts,
  MenFootwear: fetchMenFootwearProducts,
  WomenFootwear:fetchWomenFootwearProducts,
  KidsTopwear:fetchKidsTopwearProducts,
  KidsFootwear:fetchKidsFootwearProducts,
  KidsBottomwear:fetchKidsBottomwearProducts,
  getProduct:getProduct,
  menProducts:menProducts,
  womenProducts:womenProducts,
  NewProduct:NewProduct

}