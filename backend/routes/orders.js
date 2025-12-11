import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (guest checkout) or Private
router.post('/', optionalAuth, [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('subtotal').isNumeric().withMessage('Subtotal is required'),
  body('total').isNumeric().withMessage('Total is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, subtotal, deliveryFee = 10.00, total, customerInfo, paymentInfo } = req.body;

    console.log('Creating order - req.user:', req.user);
    console.log('Creating order - userId:', req.user ? req.user.id : null);
    console.log('Payment info:', paymentInfo);

    const order = await Order.create({
      userId: req.user ? req.user.id : null, // Optional user ID
      items,
      subtotal,
      deliveryFee,
      total,
      customerInfo,
      paymentInfo: paymentInfo || null // Store payment information
    });

    console.log('Order created:', order.id, 'for userId:', order.userId);

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (admin) or user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    console.log('GET /api/orders - User ID:', req.user.id);
    console.log('GET /api/orders - User role:', req.user.role);
    
    let orders;
    
    if (req.user.role === 'admin') {
      // Admin can see all orders
      orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
      console.log('Admin fetching all orders. Count:', orders.length);
    } else {
      // Users can only see their own orders
      orders = await Order.findAll({ 
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']]
      });
      console.log('User fetching own orders. Count:', orders.length);
    }

    console.log('Returning orders:', JSON.stringify(orders, null, 2));
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error fetching order' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin only)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Server error updating order' });
  }
});

export default router;
