import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductItem({ product }) {
    const [loading, setLoading] = useState(false);
    const { id, email } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        if (!id) {
            console.error('Product ID is missing:', { id });
            return;
        }
        console.log({ email, id });

        const addToCart = async () => {
            console.log('Adding to cart...');
    
            // Retrieve the token from localStorage (or wherever you are storing it)
            const token = localStorage.getItem('token');
    
            if (!token) {
                // If the token is not available, notify the user that they need to be logged in
                Swal.fire({
                    title: "Error",
                    text: "You need to be logged in to add items to your cart.",
                    icon: "error",
                });
                return;
            }

            try {
                const response = await axios.post(
                    `https://ram.freelogomaker.in/api/cart/${id}`,
                    { email, quantity: 1 },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Send token in headers
                            'Content-Type': 'application/json', // Ensure proper content type
                        },
                    }
                );
                console.log('Response:', response);

                if (response.data.success) {
                    setLoading(true);
                    Swal.fire({
                        title: "Success",
                        text: response.data.message || "Item added to cart successfully!",
                        icon: "success",
                    });

                    // Redirect to the shop after adding to the cart
                    navigate('/shop');
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "Something went wrong.",
                        icon: "error",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message || "Failed to add item to cart.",
                    icon: "error",
                });
            }
        };

        addToCart();
    }, [id, email, navigate]); // Add navigate to the dependency array

    return (
        <div className="product-item">
            {loading && (
                // You can show a loading spinner or something here if needed
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ProductItem;
