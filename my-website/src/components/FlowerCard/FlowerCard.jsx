import './FlowerCard.css';
import { useCart } from '../../context/CartContext';

function FlowerCard({ id, title, price, description, image, altText }) {
  const { addItem } = useCart();
  return (
    <div className="flower-card">
      <div className="flower-card-image">
        <img 
          src={image || '/api/placeholder/300/200'} 
          alt={altText || title} 
          className="flower-card-img"
        />
      </div>
      <div className="flower-card-content">
        <h3 className="flower-card-title">{title}</h3>
        {description && <p className="flower-card-description">{description}</p>}
        <div className="flower-card-footer">
          <p className="flower-card-price">${price}</p>
          <button 
            className="flower-card-button"
            onClick={() => addItem({ id, title, price, description, image, altText })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlowerCard;