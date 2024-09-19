const placeOrder=require("../Models/OrderAddress")
const addressDetails=async(req,res)=>{
    try {
        const {fname,lname,email,street,city,state,zipCode,country,phone}=req.body
        const newDelivery = new placeOrder({
            fname,
            lname,
            email,
            street,
            city,
            state,
            zipCode,
            country,
            phone
        });

        await newDelivery.save();

        res.status(201).json({ message: 'Delivery information saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save delivery information', details: error.message });
    }
    
}
module.exports={addressDetails}