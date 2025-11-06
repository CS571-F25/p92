import './App.css'

function Order() {
  return (
    <div className="app-content">
        <h1>Place Your Order</h1>
        <p>
          Ready to brighten your day or surprise someone special? Browse our selection of beautiful floral arrangements and place your order today.
        </p>
        
        <h2>Popular Arrangements</h2>
        <div className="product-grid">
          <div className="product-card">
            <h3>Classic Rose Bouquet</h3>
            <p>A timeless arrangement of fresh red roses, perfect for romantic occasions.</p>
            <p><strong>Price: $45.00</strong></p>
          </div>
          
          <div className="product-card">
            <h3>Spring Garden Mix</h3>
            <p>A colorful blend of seasonal flowers including tulips, daisies, and lilies.</p>
            <p><strong>Price: $35.00</strong></p>
          </div>
          
          <div className="product-card">
            <h3>Elegant White Lilies</h3>
            <p>Pure white lilies arranged with greenery for a sophisticated look.</p>
            <p><strong>Price: $50.00</strong></p>
          </div>
          
          <div className="product-card">
            <h3>Wildflower Arrangement</h3>
            <p>A rustic mix of wildflowers and herbs for a natural, countryside feel.</p>
            <p><strong>Price: $30.00</strong></p>
          </div>
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