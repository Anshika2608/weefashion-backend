const Cart = require("../Models/Cart");
const Address = require("../Models/OrderAddress");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

const createCheckoutSession = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required for payment." });
    }

    try {

        const userAddress = await Address.findOne({ email }).sort({ createdAt: -1 });

        if (!userAddress) {
            return res.status(404).json({ error: "Delivery address not found for this email." });
        }


        const cartItems = await Cart.find({ email });

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "No items in cart for this user." });
        }


        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                    images: [item.src],
                },
                unit_amount: item.Current * 100,
            },
            quantity: item.quantity || 1,
        }));


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: email,
            line_items: lineItems,
            success_url: `http://localhost:5173/success?orderId=${userAddress.orderId}`,
            cancel_url: `https://weefashion-shopping-frontend.onrender.com/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe session error:", error);
        res.status(500).json({ error: "Stripe checkout session failed.", details: error.message });
    }
};

module.exports = { createCheckoutSession };
