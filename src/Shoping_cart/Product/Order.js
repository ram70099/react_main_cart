import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id, quantity } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProductDetails = async (id, token, quantity) => {
        const url = `https://ram.freelogomaker.in/api/buynow/${id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, quantity }), // Ensure you're sending both id and quantity
            });

            if (!response.ok) {
                throw new Error("Failed to place the order");
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        const loadProduct = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    title: "Unauthorized",
                    text: "You must be logged in to place an order.",
                    icon: "error",
                });
                return;
            }

            try {
                const productData = await fetchProductDetails(id, token, quantity);
                setProduct(productData);

                if (productData.success) {
                    Swal.fire({
                        title: "Order Successful",
                        text: productData.message,
                        icon: "success",
                    });
                    // Redirect back to the previous page after successful order
                    navigate(-1); // Go back to the previous page
                } else {
                    Swal.fire({
                        title: "Order Failed",
                        text: productData.message || "There was an issue placing your order.",
                        icon: "error",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        };

        loadProduct();
    }, [id, quantity, navigate]);

    return (
        <div className="container-fluid py-5">
            {/* Add meaningful content or redirect handling */}
        </div>
    );
};

export default ProductDetail;
