const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    
    id:Number,
    title:String,
    src:String, 
    Previous:Number,
    Current:Number,
    discount:String,
    quantity:Number,
    Category:String,
    email:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Cartproducts',cartSchema)