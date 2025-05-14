const Cart = require("../Models/Cart");
const Address = require("../Models/OrderAddress");
const Stripe = require("stripe");
const stripe = Stripe("pk_test_51Q1VhFGOB3MpsHa68zznQZ0fFGismuEKdshdpW5p7S8tp4TlDcXSw9f2CJCU1nf5iFKboHogRNoLdqDQCoz8z9Ph00WvENZnwB"); // Replace with your Stripe secret key

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

    // 2. Get cart items
    const cartItems = await Cart.find({ email });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "No items in cart for this user." });
    }

    // 3. Format Stripe line items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.src],
        },
        unit_amount: item.Current * 100, // Amount in paise
      },
      quantity: item.quantity || 1,
    }));

    // 4. Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `https://your-frontend.com/success?orderId=${userAddress.orderId}`,
      cancel_url: `https://your-frontend.com/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Stripe checkout session failed.", details: error.message });
  }
};

module.exports = { createCheckoutSession };
