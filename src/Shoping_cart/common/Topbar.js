import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCart from '../Fetch/Count';
import CartModal from '../Cart/CartModal';
import Order from '../Cart/Order';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const { cartItems, orderItemsCount, loading } = useCart();

  const cartCount = cartItems.length;
  const orderCount = orderItemsCount.length;

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('count', cartCount);
    localStorage.setItem('order', orderCount);
  }, [cartCount, orderCount]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(`https://ram.freelogomaker.in/public/api/products/search?search=${searchQuery}`);
      setSearchResults(response.data);
      localStorage.setItem('search', JSON.stringify(response.data));
      setSearch(true);
      navigate('/search');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="/contact">Contact</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="#">About</a>
          </div>
        </div>
      </div>

      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a href="/" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
            </h1>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search for products" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <button 
            onClick={() => setIsOrderOpen(true)} 
            className="btn border"
          >
            <i className="fas fa-box-open text-primary"></i>
            <span className="badge order-badge">{orderCount > 0 ? orderCount : ''}</span> 
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}  
            className="btn border"
          >
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge cart-badge">{cartCount > 0 ? cartCount : ''}</span>
          </button>
        </div>
      </div>

      {isCartOpen && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      {isOrderOpen && <Order isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />}
    </div>
  );
}

export default TopBar;