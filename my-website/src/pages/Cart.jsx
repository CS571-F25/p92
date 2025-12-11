import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItemCard from '../components/CartItemCard/CartItemCard';
import CheckoutCard from '../components/CheckoutCard/CheckoutCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import '../App.css';
import './Cart.css';

// Payment Form Component (Demo Mode)
function PaymentForm({ onSubmit, isProcessing, billingInfo, onBillingChange }) {
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Processing in demo mode');
    onSubmit('demo_payment_method');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Label htmlFor="cardName" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
          Name on Card *
        </Label>
        <Input
          type="text"
          id="cardName"
          name="cardName"
          value={billingInfo.cardName}
          onChange={onBillingChange}
          required
          style={{
            fontSize: '1rem',
            padding: '0.75rem',
            border: '2px solid #ccc',
            borderRadius: '32px',
            backgroundColor: '#f8f9fa',
            color: '#000'
          }}
        />
      </div>

      <div>
        <Label htmlFor="cardNumber" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
          Card Number * (Demo Mode)
        </Label>
        <Input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          style={{
            fontSize: '1rem',
            padding: '0.75rem',
            border: '2px solid #ccc',
            borderRadius: '32px',
            backgroundColor: '#f8f9fa',
            color: '#000'
          }}
        />
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
          Demo mode: Payment simulation only (no real charges)
        </p>
      </div>

      <div>
        <Label htmlFor="billingAddress" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
          Billing Address *
        </Label>
        <Input
          type="text"
          id="billingAddress"
          name="billingAddress"
          value={billingInfo.billingAddress}
          onChange={onBillingChange}
          required
          style={{
            fontSize: '1rem',
            padding: '0.75rem',
            border: '2px solid #ccc',
            borderRadius: '32px',
            backgroundColor: '#f8f9fa',
            color: '#000'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <Label htmlFor="billingCity" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            City *
          </Label>
          <Input
            type="text"
            id="billingCity"
            name="billingCity"
            value={billingInfo.billingCity}
            onChange={onBillingChange}
            required
            style={{
              fontSize: '1rem',
              padding: '0.75rem',
              border: '2px solid #ccc',
              borderRadius: '32px',
              backgroundColor: '#f8f9fa',
              color: '#000'
            }}
          />
        </div>

        <div>
          <Label htmlFor="billingState" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            State *
          </Label>
          <Input
            type="text"
            id="billingState"
            name="billingState"
            value={billingInfo.billingState}
            onChange={onBillingChange}
            required
            style={{
              fontSize: '1rem',
              padding: '0.75rem',
              border: '2px solid #ccc',
              borderRadius: '32px',
              backgroundColor: '#f8f9fa',
              color: '#000'
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="billingZip" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
          ZIP Code *
        </Label>
        <Input
          type="text"
          id="billingZip"
          name="billingZip"
          value={billingInfo.billingZip}
          onChange={onBillingChange}
          required
          style={{
            fontSize: '1rem',
            padding: '0.75rem',
            border: '2px solid #ccc',
            borderRadius: '32px',
            backgroundColor: '#f8f9fa',
            color: '#000'
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isProcessing}
        style={{
          width: '100%',
          backgroundColor: '#203d2b',
          color: 'white',
          fontSize: '1.1rem',
          padding: '1rem',
          borderRadius: '32px',
          marginTop: '1rem'
        }}
      >
        {isProcessing ? 'Processing...' : 'Continue to Shipping'}
      </Button>
    </form>
  );
}

function Cart() {
  console.log('Cart component rendering...');
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { getToken, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutType, setCheckoutType] = useState(null); // 'guest' or 'user'
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: billing, 2: shipping
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: ''
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: ''
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Don't allow quantity to go below 0
    if (newQuantity < 0) {
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openCheckoutModal = () => {
    setShowCheckoutModal(true);
    setCheckoutStep(1);
    if (isAuthenticated) {
      setCheckoutType('user');
      // Pre-fill with user info if available
      setShippingInfo(prev => ({
        ...prev,
        name: user?.username || '',
        email: user?.email || ''
      }));
    }
  };

  const proceedToShipping = (paymentMethod) => {
    console.log('Proceeding to shipping with payment method:', paymentMethod);
    // Validate billing info
    if (!billingInfo.cardName) {
      setCheckoutError('Please enter the name on card');
      return;
    }
    setCheckoutError(null);
    setPaymentMethodId(paymentMethod);
    setCheckoutStep(2);
  };

  const handleCheckout = async (paymentMethodId) => {
    // Validate shipping info
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      setCheckoutError('Please fill in all required fields');
      return;
    }

    // Validate payment method exists
    if (!paymentMethodId) {
      setCheckoutError('Payment information missing. Please go back to billing.');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const deliveryFee = 10.00;
      const total = totalPrice + deliveryFee;

      // Step 1: Process payment through backend
      let paymentResult = null;
      if (paymentMethodId && paymentMethodId !== 'demo_payment_method') {
        const token = isAuthenticated ? getToken() : null;
        const paymentResponse = await fetch('http://localhost:5000/api/payment/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            paymentMethodId,
            amount: total,
            currency: 'usd',
            description: `MaiMai Flowers Order - ${items.length} item(s)`,
            metadata: {
              customerEmail: shippingInfo.email,
              customerName: shippingInfo.name
            }
          })
        });

        if (!paymentResponse.ok) {
          const errorData = await paymentResponse.json();
          throw new Error(errorData.error || 'Payment failed');
        }

        paymentResult = await paymentResponse.json();
        console.log('Payment processed:', paymentResult);
      }

      // Step 2: Prepare order data with payment info
      const orderData = {
        items: items.filter(item => item.quantity > 0).map(item => ({
          productId: item.id,
          title: item.title,
          price: parseFloat(item.price),
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: totalPrice,
        deliveryFee: deliveryFee,
        total: total,
        customerInfo: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          deliveryAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`,
          specialInstructions: shippingInfo.specialInstructions
        },
        paymentInfo: paymentResult ? {
          paymentMethodId: paymentMethodId,
          chargeId: paymentResult.chargeId,
          amount: paymentResult.amount,
          currency: paymentResult.currency,
          status: paymentResult.status,
          demo: paymentResult.demo || false
        } : {
          demo: true,
          paymentMethodId: 'demo_payment_method'
        }
      };

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json'
      };

      // Add auth token if user is logged in
      if (isAuthenticated) {
        const token = getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);

      setShowCheckoutModal(false);
      setCheckoutComplete(true);
      clearCart();
      // Reset forms
      setShippingInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        specialInstructions: ''
      });
      setBillingInfo({
        cardName: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZip: ''
      });
      setCheckoutStep(1);
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (checkoutComplete) {
    return (
      <div className="app-content">
        <div className="checkout-success">
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order. We'll prepare your beautiful flower arrangement and deliver it soon.</p>
          <p>You'll receive a confirmation email with tracking details shortly.</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => setCheckoutComplete(false)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="app-content">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Browse our beautiful flower arrangements and add some to your cart!</p>
          <Link to="/order" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>
    );
  }

  if (checkoutError) {
    return (
      <div className="app-content">
        <div className="checkout-error">
          <h1>Checkout Error</h1>
          <p style={{ color: '#dc3545' }}>{checkoutError}</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => setCheckoutError(null)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h1>Your Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {items.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={removeItem}
            />
          ))}
        </div>
        
        <CheckoutCard
          items={items}
          totalPrice={totalPrice}
          isCheckingOut={isCheckingOut}
          onCheckout={openCheckoutModal}
          onClearCart={clearCart}
        />
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '32px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            {/* Close button */}
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                setCheckoutError(null);
              }}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>

            <h2 style={{ marginBottom: '1.5rem', color: '#203d2b' }}>Checkout</h2>

            {checkoutError && (
              <div style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                {checkoutError}
              </div>
            )}

            {/* If not authenticated, show login/guest options */}
            {!isAuthenticated && !checkoutType && (
              <div>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                  How would you like to continue?
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Button
                    onClick={() => navigate('/login')}
                    style={{
                      width: '100%',
                      backgroundColor: '#203d2b',
                      color: 'white',
                      fontSize: '1.1rem',
                      padding: '1rem',
                      borderRadius: '32px'
                    }}
                  >
                    Login / Register
                  </Button>
                  
                  <Button
                    onClick={() => setCheckoutType('guest')}
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: '#203d2b',
                      fontSize: '1.1rem',
                      padding: '1rem',
                      borderRadius: '32px',
                      border: '2px solid #203d2b'
                    }}
                  >
                    Continue as Guest
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1: Billing Information */}
            {(isAuthenticated || checkoutType === 'guest') && checkoutStep === 1 && (
              <PaymentForm 
                onSubmit={proceedToShipping}
                isProcessing={isCheckingOut}
                billingInfo={billingInfo}
                onBillingChange={handleBillingInputChange}
              />
            )}

            {/* Step 2: Shipping Information Form */}
            {(isAuthenticated || checkoutType === 'guest') && checkoutStep === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleCheckout(paymentMethodId); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#203d2b',
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    marginBottom: '0.5rem'
                  }}
                >
                  ← Back to Billing
                </Button>

                <div>
                  <Label htmlFor="name" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    Full Name *
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleShippingInputChange}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '32px',
                      backgroundColor: '#f8f9fa',
                      color: '#000'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="email" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInputChange}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '32px',
                      backgroundColor: '#f8f9fa',
                      color: '#000'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    Phone Number *
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingInputChange}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '32px',
                      backgroundColor: '#f8f9fa',
                      color: '#000'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="address" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    Street Address *
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInputChange}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '32px',
                      backgroundColor: '#f8f9fa',
                      color: '#000'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <Label htmlFor="city" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                      City *
                    </Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInputChange}
                      required
                      style={{
                        fontSize: '1rem',
                        padding: '0.75rem',
                        border: '2px solid #ccc',
                        borderRadius: '32px',
                        backgroundColor: '#f8f9fa',
                        color: '#000'
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                      State *
                    </Label>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInputChange}
                      required
                      style={{
                        fontSize: '1rem',
                        padding: '0.75rem',
                        border: '2px solid #ccc',
                        borderRadius: '32px',
                        backgroundColor: '#f8f9fa',
                        color: '#000'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    ZIP Code *
                  </Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInputChange}
                    required
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '32px',
                      backgroundColor: '#f8f9fa',
                      color: '#000'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="specialInstructions" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                    Special Instructions (Optional)
                  </Label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={shippingInfo.specialInstructions}
                    onChange={handleShippingInputChange}
                    rows="3"
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem',
                      border: '2px solid #ccc',
                      borderRadius: '16px',
                      backgroundColor: '#f8f9fa',
                      width: '100%',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      color: '#000'
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isCheckingOut}
                  style={{
                    width: '100%',
                    backgroundColor: '#203d2b',
                    color: 'white',
                    fontSize: '1.1rem',
                    padding: '1rem',
                    borderRadius: '32px',
                    marginTop: '1rem'
                  }}
                >
                  {isCheckingOut ? 'Processing...' : 'Complete Order'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;