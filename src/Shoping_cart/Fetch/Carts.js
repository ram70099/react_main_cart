// src/hooks/useCartData.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useCartData = (isOpen) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        const response = await axios.get("https://ram.freelogomaker.in/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartData = response.data?.cart || [];
        const cartProducts = response.data?.cartproduct || [];

        const mergedCartItems = cartData.map((cartItem) => {
          const product = cartProducts.find((product) => product.id === cartItem.product_id);
          return product ? { ...cartItem, ...product } : null;
        }).filter(Boolean);

        setCartItems(mergedCartItems);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen]);

  return { cartItems, loading, error };
};

export default useCartData;
