import { useState, useEffect } from "react";
import axios from "axios";

const useCartData = (isOpen) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // Avoid unnecessary API calls when modal is closed

    const fetchCartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        const response = await axios.get("https://ram.freelogomaker.in/api/order", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cartData = response.data?.cart || [];
        const cartProducts = response.data?.cartproduct || [];

        // Merge cart items with product details
        const mergedCartItems = cartData
          .map((cartItem) => {
            const product = cartProducts.find((p) => p.id === cartItem.product_id);
            return product ? { ...cartItem, ...product } : null;
          })
          .filter(Boolean); // Remove null values

        setCartItems(mergedCartItems);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching cart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [isOpen]);

  return { cartItems, loading, error };
};

export default useCartData;
