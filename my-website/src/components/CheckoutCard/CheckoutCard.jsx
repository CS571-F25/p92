import './CheckoutCard.css';

function CheckoutCard({ items, totalPrice, isCheckingOut, onCheckout, onClearCart }) {
  const totalItems = items.reduce((sum, item) => item.quantity > 0 ? sum + item.quantity : sum, 0);
  const deliveryFee = 10.00;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="checkout-card">
      <h3>Order Summary</h3>
      <div className="summary-line">
        <span>Items ({totalItems}):</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="summary-line">
        <span>Delivery:</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
      <div className="summary-line total">
        <span>Total:</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
      
      <button 
        className="checkout-btn"
        onClick={onCheckout}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
      </button>
      
      <button 
        className="clear-cart-btn"
        onClick={onClearCart}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default CheckoutCard;