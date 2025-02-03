import React, { useState } from "react";
import { removeCartItem } from "../Fetch/Cancel";
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import useCartData from "../Fetch/Order"; // Fixed import

import "../css/CartModal.css";

function CartModal({ isOpen, onClose }) {
  const { cartItems, loading, error } = useCartData(isOpen); // Fixed hook usage
  const [removing, setRemoving] = useState(false); // State to track removal process

  const handleRemoveItem = async (itemId) => {
    setRemoving(true);
    try {
      const result = await removeCartItem(itemId);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Item has been removed from your cart.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        })
      } else {
        throw new Error("Failed to remove item.");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Failed to remove item. Please try again.",
      });
    }
    setRemoving(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = item.quantity || 1;
      return sum + itemPrice * itemQuantity;
    }, 0);
  };

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Ordered Items</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="empty-cart">No ordered items to display!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`}>
                  <img src={item.pimage} alt={item.pname} className="item-image" />
                </Link>
                <div className="item-details">
                  <h3>{item.pname}</h3>
                  <p className="item-price">
                    ${((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <p className="item-quantity">Quantity: {item.quantity || 1}</p>
                </div>
                <Link to={`/product/${item.id}`}>

                  Product Detial
                </Link>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-button"
                  disabled={removing}
                >
                  <i className="fas fa-trash-alt"></i> {removing ? "Removing..." : "Cancel Item"}
                </button>


              </div>
            ))
          )}

          {cartItems.length > 0 && !loading && !error && (
            <div className="cart-summary">
              <div className="subtotal">
                <span>
                  Total ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items):
                </span>
                <span className="total-price">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;
