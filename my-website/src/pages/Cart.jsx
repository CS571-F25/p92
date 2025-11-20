import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard/CartItemCard';
import CheckoutCard from '../components/CheckoutCard/CheckoutCard';
import '../App.css';
import './Cart.css';

function Cart() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Don't allow quantity to go below 0
    if (newQuantity < 0) {
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2000);
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
          <a href="/p92/order" className="shop-now-btn">Shop Now</a>
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
          onCheckout={handleCheckout}
          onClearCart={clearCart}
        />
      </div>
    </div>
  );
}

export default Cart;