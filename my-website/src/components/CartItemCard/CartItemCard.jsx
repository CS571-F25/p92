import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import './CartItemCard.css';

function CartItemCard({ item, onQuantityChange, onRemove }) {
  const handleQuantityChange = (newQuantity) => {
    // Don't allow quantity to go below 0
    if (newQuantity < 0) {
      return;
    }
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <Card className={`cart-item-card ${item.quantity === 0 ? 'zero-quantity' : ''}`}>
      <div className="cart-item-image">
        <img 
          src={item.image || '/api/placeholder/100/100'} 
          alt={item.altText || item.title}
        />
      </div>
      
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-description">{item.description}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <Button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity === 0}
          >
            -
          </Button>
          <span className="quantity-display">{item.quantity}</span>
          <Button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </Button>
        </div>
        
        <div className="cart-item-price">
          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
        </div>
        
        <Button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          ×
        </Button>
      </div>
    </Card>
  );
}

export default CartItemCard;