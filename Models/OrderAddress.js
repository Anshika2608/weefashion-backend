const mongoose=require("mongoose")
const { v4: uuidv4 } = require("uuid");
const addressSchema=new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        default: function() {
          return uuidv4().split('-')[0]; 
        },
      },
   fname:{
      type:String,
      required:true,
      validate: {
        validator: function (v) {
          return /^[A-Za-z]{2,50}$/.test(v); 
        },
        message: 'Last name must only contain letters (A-Z or a-z) and be 2-50 characters long',
      },
   },
   lname:{
    type:String,
    required:true,
    validate: {
        validator: function (v) {
          return /^[A-Za-z]{2,50}$/.test(v); 
        },
        message: 'Last name must only contain letters (A-Z or a-z) and be 2-50 characters long',
      },
   },
   email:{
    type:String,
    required:true,
    lowercase: true, 
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please provide a valid email address',
    }
   },
   street:{
    type:String,
      required:true,
   },
   city:{
    type:String,
      required:true,
   },
   state:{
    type:String,
    required:true,
   },
   zipCode:{
    type:Number,
    required:true,
   },
   country:{
    type:String,
    required:true,
   },
   phone:{
    type:Number,
    required:true,
    validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v.toString()); 
        },
        message: 'Phone number must be a 10-digit number starting with 6, 7, 8, or 9',
    },

    
    }

})
module.exports=mongoose.model('address',addressSchema)
