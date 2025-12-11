import '../App.css'
import FlowerCard from '../components/FlowerCard/FlowerCard'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'

function Order() {
  // Flower arrangement data
  const arrangements = [
    {
      id: 1,
      title: "Classic Rose Bouquet",
      description: "A timeless arrangement of fresh red roses, perfect for romantic occasions.",
      price: "45.00",
      image: "/p92/images/rose.jpeg",
      altText: "Classic red rose bouquet"
    },
    {
      id: 2,
      title: "Spring Garden Mix",
      description: "A colorful blend of seasonal flowers including tulips, daisies, and lilies.",
      price: "35.00",
      image: "/p92/images/spring_garden.jpeg",
      altText: "Colorful spring flower arrangement"
    },
    {
      id: 3,
      title: "Elegant White Lilies",
      description: "Pure white lilies arranged with greenery for a sophisticated look.",
      price: "50.00",
      image: "/p92/images/white_lillies.jpg",
      altText: "Elegant white lily arrangement"
    },
    {
      id: 4,
      title: "Wildflower Arrangement",
      description: "A rustic mix of wildflowers and herbs for a natural, countryside feel.",
      price: "30.00",
      image: "/p92/images/flower_assortment.jpeg",
      altText: "Rustic wildflower arrangement"
    }
  ];

  return (
    <div className="app-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', position: 'relative' }}>
          <h1 style={{ margin: 0 }}>Place Your Order</h1>
          <Link to="/my-orders" style={{ position: 'absolute', right: 0 }}>
            <Button 
              style={{
                backgroundColor: '#203d2b',
                color: 'white',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d5a3d'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
            >
              <Package className="w-5 h-5" />
              My Orders
            </Button>
          </Link>
        </div>
        <p>
          Ready to brighten your day or surprise someone special? Browse our selection of beautiful floral arrangements and place your order today.
        </p>
        
        <h2>Popular Arrangements</h2>
        <div className="product-grid">
          {arrangements.map(arrangement => (
            <FlowerCard
              key={arrangement.id}
              id={arrangement.id}
              title={arrangement.title}
              description={arrangement.description}
              price={arrangement.price}
              image={arrangement.image}
              altText={arrangement.altText}
            />
          ))}
        </div>
        
        <h2>How to Order</h2>
        <ol>
          <li>Choose your preferred arrangement from our selection above</li>
          <li>Call us at (555) 123-FLOWER or visit our shop in person</li>
          <li>Provide delivery details and any special instructions</li>
          <li>Complete payment and we'll handle the rest</li>
        </ol>
        
        <p>
          <strong>Delivery:</strong> We offer same-day delivery within our service area for orders placed before 2 PM. 
          Delivery fees start at $10 depending on your location.
        </p>
        
        <p>
          <strong>Custom Orders:</strong> Need something special? We love creating custom arrangements! 
          Contact us to discuss your vision and we'll bring it to life.
        </p>
    </div>
  )
}

export default Order