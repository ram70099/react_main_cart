import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import Swal from "sweetalert2";
import useCartData from '../Fetch/Carts'; // Import the custom hook
import '../css/CartModal.css';
import { removeCartItem } from '../Fetch/RemoveCart'; // Import the API function


function CartModal({ isOpen, onClose, removeItem }) {
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: '',
    paymentMethod: '',
  });

  // Use the custom hook to fetch cart data
  const { cartItems, loading, error } = useCartData(isOpen);
  const [localCart, setLocalCart] = useState([]);

  // Update localCart whenever cartItems change
  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const isCartEmpty = localCart.length === 0;

  const calculateTotal = () => {
    return localCart.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price);
      return sum + itemPrice * item.quantity;
    }, 0);
  };
  const handleRemoveItem = async (itemId) => {
    const result = await removeCartItem(itemId);
    if (result.success) {
        // Update local state after successful removal
        setLocalCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Item has been removed from your cart.',
            timer: 1500, // Auto-close after 1.5 seconds
            showConfirmButton: false,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to remove item. Please try again.',
        });
    }
};

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity going below 1
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckoutClick = () => {
    setIsCheckout(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Invoice', 10, 10);
    doc.text(`Name: ${userDetails.name}`, 10, 20);
    doc.text(`Email: ${userDetails.email}`, 10, 30);
    doc.text(`Address: ${userDetails.address}`, 10, 40);
    doc.text(`Payment Method: ${userDetails.paymentMethod}`, 10, 50);

    doc.text('Cart Items:', 10, 60);
    localCart.forEach((item, index) => {
      doc.text(`${item.pname} - $${(parseFloat(item.price) * item.quantity).toFixed(2)}`, 10, 70 + index * 10);
    });

    doc.save('invoice.pdf');
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isCheckout ? 'Checkout' : `Shopping Cart (${localCart.length} items)`}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {!isCheckout ? (
          <div className="cart-items">
            {loading ? (
              <p className="loading-text">Loading...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : isCartEmpty ? (
              <p className="empty-cart">Your cart is empty!</p>
            ) : (
              localCart.map((item) => (
                <div key={item.id} className="cart-item">
                                        <Link to={`/product/${item.id}`}>
                                        <img src={item.pimage} alt={item.pname} className="item-image" />
                                        </Link>
                  <div className="item-details">
                    <h3>{item.pname}</h3>
                    <p className="item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-button"
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                      <Link to={`/product/${item.id}`}>
                      
                         Product Detial
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}

            {!isCartEmpty && !loading && !error && (
              <div className="cart-summary">
                <div className="subtotal">
                  <span>Subtotal ({localCart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span className="total-price">${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-button" onClick={handleCheckoutClick}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="checkout-form">
            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Payment Method:</label>
                <select
                  name="paymentMethod"
                  value={userDetails.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Submit Order</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
