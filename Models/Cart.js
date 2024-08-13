const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    
    id:Number,
    title:String,
    src:String, 
    Previous:Number,
    Current:Number,
    discount:String,
    quantity:Number,
    Category:String
});
module.exports=mongoose.model('Cartproducts',cartSchema)