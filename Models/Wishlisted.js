const mongoose=require('mongoose');
const wishlistSchema=new mongoose.Schema({
    
    id:Number,
    title:String,
    src:String, 
    Previous:Number,
    Current:Number,
    discount:String,
    email:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('wishlistItems',wishlistSchema)