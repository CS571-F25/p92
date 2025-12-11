import express from 'express';
import Stripe from 'stripe';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Initialize Stripe with secret key from environment
const stripe = process.env.STRIPE_SECRET_KEY 
  ? Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

/**
 * POST /api/payment/create-payment-intent
 * Create a payment intent for the order
 */
router.post('/create-payment-intent', optionalAuth, async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount. Amount must be greater than 0.' 
      });
    }

    // Check if Stripe is configured
    if (!stripe) {
      return res.status(200).json({
        demo: true,
        message: 'Stripe not configured. Running in demo mode.',
        clientSecret: 'demo_client_secret'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        userId: req.user ? req.user.id : 'guest',
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error.message 
    });
  }
});

/**
 * POST /api/payment/confirm
 * Confirm a payment was successful
 */
router.post('/confirm', optionalAuth, async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // If in demo mode or no payment method, just confirm
    if (!stripe || paymentMethodId === 'demo_payment_method') {
      return res.json({
        success: true,
        demo: true,
        message: 'Demo mode - payment not actually processed'
      });
    }

    // Verify the payment method exists
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    res.json({
      success: true,
      paymentMethod: {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year
        } : null
      }
    });

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ 
      error: 'Failed to confirm payment',
      message: error.message 
    });
  }
});

/**
 * POST /api/payment/charge
 * Create a charge using a payment method
 */
router.post('/charge', optionalAuth, async (req, res) => {
  try {
    const { paymentMethodId, amount, currency = 'usd', description, metadata = {} } = req.body;

    // Validate inputs
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount. Amount must be greater than 0.' 
      });
    }

    if (!paymentMethodId) {
      return res.status(400).json({ 
        error: 'Payment method ID is required.' 
      });
    }

    // Check if Stripe is configured or in demo mode
    if (!stripe || paymentMethodId === 'demo_payment_method') {
      return res.json({
        success: true,
        demo: true,
        message: 'Demo mode - payment not actually processed',
        chargeId: 'demo_charge_' + Date.now()
      });
    }

    // Create a payment intent and confirm it in one step
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirm: true,
      description: description || 'MaiMai Flowers Order',
      metadata: {
        userId: req.user ? req.user.id : 'guest',
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    // Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      res.json({
        success: true,
        chargeId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment not completed',
        status: paymentIntent.status
      });
    }

  } catch (error) {
    console.error('Error processing charge:', error);
    res.status(500).json({ 
      error: 'Failed to process payment',
      message: error.message 
    });
  }
});

export default router;
