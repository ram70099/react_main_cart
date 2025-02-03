// NavLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavLinks({ auth, setIsCartOpen }) {
  return (
    <div className="navbar-nav mr-auto py-0">
      <Link to="/" className="nav-item nav-link">Home</Link>
      <Link to="/shop" className="nav-item nav-link">Shop</Link>

      <button
        className="nav-item nav-link bg-transparent border-0 p-0"
        style={{ cursor: 'pointer', color: 'inherit' }}
        onClick={() => setIsCartOpen(true)}
      >
        Cart
      </button>

      <Link to="/contact" className="nav-item nav-link">Contact</Link>
    </div>
  );
}

export default NavLinks;
