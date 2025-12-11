import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">Mai Mai Flowers</Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/order" className="navbar-link">Order</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contact Us</Link>
          </li>
          <li className="navbar-item">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="navbar-link"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="navbar-link">Login</Link>
            )}
          </li>
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link cart-link">
              🛒
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;