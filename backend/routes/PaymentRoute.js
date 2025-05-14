// routes/paymentRoutes.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Secret key from .env file
const router = express.Router();

// POST route for processing payment
router.post('/', async (req, res) => {
  const { paymentMethodId, amount, userId } = req.body;

  try {
    // Creating a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (100 paise = 1 INR)
      currency: 'inr', // Currency (change it to 'usd' if you're working with USD)
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,  // Automatically confirm the payment
    });

    // If the payment is successful
    if (paymentIntent.status === 'succeeded') {
      // Optionally, you can store the transaction details in your database (MongoDB)
      res.json({ success: true, message: 'Payment successful!' });
    } else {
      res.json({ success: false, error: 'Payment not completed' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
