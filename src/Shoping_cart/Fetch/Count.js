// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderItemsCount, setOrderItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Cart Items and Order Count
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('User is not logged in.');
          return;
        }

        const response = await axios.get('https://ram.freelogomaker.in/api/cart/show', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cartproducts);
        setOrderItemsCount(response.data.orderCount);

        // Store the count values in localStorage
        localStorage.setItem('count', response.data.cartproducts.length);
        localStorage.setItem('order', response.data.orderCount.length);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Return the necessary state values
  return { cartItems, orderItemsCount, loading };
};

export default useCart;
