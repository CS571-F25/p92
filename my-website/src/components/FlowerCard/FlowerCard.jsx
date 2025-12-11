import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '../../context/CartContext';
import './FlowerCard.css';

function FlowerCard({ id, title, price, description, image, altText }) {
  const { addItem } = useCart();
  return (
    <Card className="flower-card">
      <div className="flower-card-image">
        <img 
          src={image || '/api/placeholder/300/200'} 
          alt={altText || title} 
        />
      </div>
      <CardContent className="flower-card-content">
        <h3 className="flower-card-title">{title}</h3>
        {description && <p className="flower-card-description">{description}</p>}
      </CardContent>
      <CardFooter className="flower-card-footer">
        <p className="flower-card-price">${price}</p>
        <Button 
          className="add-to-cart-btn"
          onClick={() => addItem({ id, title, price, description, image, altText })}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FlowerCard;