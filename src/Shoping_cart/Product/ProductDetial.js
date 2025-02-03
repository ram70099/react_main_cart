import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);  // New state flag
    const navigate = useNavigate();

    // Fetch product details when the component mounts or the id changes
    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = localStorage.getItem('token');
            const url = `https://ram.freelogomaker.in/api/product/${id}`;

            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }

                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to load product details.",
                    icon: "error",
                });
            }
        };

        fetchProductDetails();
    }, [id]);

    // Handlers for quantity adjustment
    const handleIncrease = () => {
        if (quantity < product?.pstock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Fetch and place the order
    const handleBuyNow = async () => {
        if (orderPlaced) return;  // Prevent multiple clicks

        setOrderPlaced(true);  // Set flag to true

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                title: "Unauthorized",
                text: "You must be logged in to place an order.",
                icon: "error",
            });
            setOrderPlaced(false);  // Reset the flag
            return;
        }

        const url = `https://ram.freelogomaker.in/api/buynow/${id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, quantity }),
            });

            if (!response.ok) {
                throw new Error("Failed to place the order");
            }

            const productData = await response.json();

            if (productData.success) {
               

                // Redirect to the order confirmation page or go back
                navigate(`/order/${id}`);
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
        } finally {
            setOrderPlaced(false);  // Reset the flag after the process
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                {/* Product Image Section */}
                <div className="col-lg-6 pb-5">
                    <div className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">
                            <div className="carousel-item active">
                                <img
                                    className="img-fluid w-80"
                                    src={`/${product?.pimage}`}
                                    alt={product?.pname}
                                    style={{ height: '500px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="col-lg-6 pb-5">
                    <h3 className="font-weight-bold mb-3" style={{ fontSize: '2.5rem' }}>{product?.pname}</h3>

                    {/* Product Description */}
                    <p className="mb-4" style={{ fontSize: '1.2rem', color: '#555' }}>{product?.pdescription}</p>

                    {/* Product Stock */}
                    <div className="d-flex mb-4">
                        <p className="text-dark font-weight-medium mb-0 mr-3" style={{ fontSize: '1.2rem' }}>
                            Stock: <span className="font-weight-bold">{product?.pstock}</span>
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mb-4">
                        <div className="input-group quantity mr-3" style={{ width: '160px' }}>
                            <button className="btn btn-outline-primary btn-sm" onClick={handleDecrease}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                type="text"
                                className="form-control bg-light text-center"
                                value={quantity}
                                readOnly
                                style={{ fontSize: '1.2rem' }}
                            />
                            <button className="btn btn-outline-primary btn-sm" onClick={handleIncrease}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="d-flex justify-content-start mb-4">
                        {/* Add to Cart Button */}
                        <Link to={`/cart/${product?.id}`} className="btn btn-success px-4 py-2 mr-2 d-flex align-items-center">
                            <i className="fa fa-shopping-cart mr-2"></i> Add To Cart
                        </Link>

                        {/* Buy Now Button */}
                        <button onClick={handleBuyNow} className="btn btn-danger px-4 py-2 d-flex align-items-center">
                            <i className="fas fa-credit-card mr-2"></i> Buy Now
                        </button>
                    </div>

                    {/* Social Media Share Links */}
                    <div className="d-flex align-items-center pt-3">
                        <p className="text-dark font-weight-medium mr-3 mb-0" style={{ fontSize: '1.1rem' }}>Share on:</p>
                        <div className="d-flex">
                            {/* Facebook Share */}
                            <a
                                className="btn btn-outline-primary rounded-circle mx-2"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yourwebsite.com/product/${product?.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.5rem' }}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>

                            {/* Instagram Share */}
                            <a
                                className="btn btn-outline-danger rounded-circle mx-2"
                                href={`https://www.instagram.com/?url=${encodeURIComponent(`https://yourwebsite.com/product/${product?.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.5rem' }}
                            >
                                <i className="fab fa-instagram"></i>
                            </a>

                            {/* WhatsApp Share */}
                            <a
                                className="btn btn-outline-success rounded-circle mx-2"
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product?.pname)}%20${encodeURIComponent(`https://yourwebsite.com/product/${product?.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.5rem' }}
                            >
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
