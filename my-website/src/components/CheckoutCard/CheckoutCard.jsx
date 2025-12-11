import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import './CheckoutCard.css';

function CheckoutCard({ items, totalPrice, isCheckingOut, onCheckout, onClearCart }) {
  const totalItems = items.reduce((sum, item) => item.quantity > 0 ? sum + item.quantity : sum, 0);
  const deliveryFee = 10.00;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <Card className="checkout-card">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
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
        
        <Button 
          className="checkout-btn"
          onClick={onCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
        </Button>
        
        <Button 
          className="clear-cart-btn"
          onClick={onClearCart}
        >
          Clear Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default CheckoutCard;