import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../App.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const { getToken, isAuthenticated } = useAuth();

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setError('Please log in to view your orders');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = getToken();
        console.log('Fetching orders with token:', token ? 'Token exists' : 'No token');
        
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error response:', errorData);
          throw new Error(errorData.error || 'Failed to fetch orders');
        }

        const data = await response.json();
        console.log('Orders received:', data);
        setOrders(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, getToken]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'processing':
        return '#17a2b8';
      case 'shipped':
        return '#007bff';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="app-content">
        <h1>My Orders</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app-content">
        <h1>My Orders</h1>
        <Card className="max-w-2xl mx-auto mt-8">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              Please log in to view your order history.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-content">
        <h1>My Orders</h1>
        <Card className="max-w-2xl mx-auto mt-8">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="app-content">
        <h1>My Orders</h1>
        <Card className="max-w-2xl mx-auto mt-8">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h1>My Orders</h1>
      <p className="mb-8">View your order history and track your deliveries</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {orders.map((order) => {
          const isExpanded = expandedOrders.has(order.id);
          const items = order.items || [];
          const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
          
          return (
            <Card 
              key={order.id} 
              style={{ 
                border: '2px solid #000',
                borderRadius: '32px',
                overflow: 'hidden'
              }}
              className="shadow-lg"
            >
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                  <CardTitle className="text-xl" style={{ fontWeight: '700' }}>Order #{order.id}</CardTitle>
                  <span 
                    style={{ 
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>Order Date</p>
                    <p style={{ fontSize: '1rem' }}>{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>Total Amount</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#203d2b' }}>
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>Items</p>
                  <p style={{ fontSize: '1rem' }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                </div>

                {order.customerInfo?.deliveryAddress && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>Delivery Address</p>
                    <p style={{ fontSize: '1rem' }}>{order.customerInfo.deliveryAddress}</p>
                  </div>
                )}

                {order.customerInfo?.specialInstructions && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>Special Instructions</p>
                    <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>{order.customerInfo.specialInstructions}</p>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
                  <Button
                    onClick={() => toggleOrderExpand(order.id)}
                    style={{
                      width: '100%',
                      backgroundColor: '#203d2b',
                      color: 'white',
                      fontSize: '1rem',
                      padding: '0.75rem',
                      borderRadius: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d5a3d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
                  >
                    {isExpanded ? (
                      <>
                        Hide Order Details
                        <ChevronUp className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        View Order Details
                        <ChevronDown className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div style={{ 
                    marginTop: '1.5rem', 
                    padding: '1.5rem', 
                    backgroundColor: '#f8f9fa',
                    borderRadius: '16px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#203d2b' }}>
                      Order Items
                    </h3>
                    
                    {items.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {items.map((item, index) => (
                          <div 
                            key={index}
                            style={{
                              display: 'flex',
                              gap: '1rem',
                              padding: '1rem',
                              backgroundColor: 'white',
                              borderRadius: '12px',
                              border: '1px solid #e0e0e0'
                            }}
                          >
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.title || 'Product'}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '8px'
                                }}
                              />
                            )}
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#203d2b' }}>
                                {item.title || 'Product'}
                              </h4>
                              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                Quantity: {item.quantity || 1}
                              </p>
                              <p style={{ fontSize: '1rem', fontWeight: '700', color: '#203d2b', marginTop: '0.25rem' }}>
                                ${parseFloat(item.price || 0).toFixed(2)} each
                              </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Subtotal</p>
                              <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#203d2b' }}>
                                ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {/* Order Summary */}
                        <div style={{ 
                          marginTop: '1rem', 
                          padding: '1rem',
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          border: '2px solid #203d2b'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.95rem', color: '#666' }}>Subtotal:</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                              ${parseFloat(order.subtotal || 0).toFixed(2)}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.95rem', color: '#666' }}>Delivery Fee:</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                              ${parseFloat(order.deliveryFee || 0).toFixed(2)}
                            </span>
                          </div>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            paddingTop: '0.5rem',
                            borderTop: '2px solid #203d2b'
                          }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#203d2b' }}>Total:</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#203d2b' }}>
                              ${parseFloat(order.total || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: '#666', fontStyle: 'italic' }}>No items found in this order.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
