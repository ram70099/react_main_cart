import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchProducts from '../Fetch/Product'; // Import the custom hook

function ProductList({products}) {
    const { categoryId } = useParams();

    // Fetch products using the custom hook
    const { loading, error, data } = useFetchProducts(categoryId);

    
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="dropdown ml-4">
                                    <button
                                        className="btn border dropdown-toggle"
                                        type="button"
                                        id="triggerId"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Sort by
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Latest
                                        </button>
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Popularity
                                        </button>
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Best Rating
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Display products if they exist */}
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                    <div className="card product-item border-0 mb-4">
                                        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    className="img-fluid w-100"
                                                    src={`/${product.pimage}`} 
                                                    alt={product.pname}
                                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                            <h6 className="text-truncate mb-3">{product.pname}</h6>
                                            <div className="d-flex justify-content-center">
                                                <h6>${product.price}</h6>
                                                {product.pstock && (
                                                    <h6 className="text-muted ml-2">
                                                        <del>{product.pstock}</del>
                                                    </h6>
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between bg-light border">
                                            <form action={`/cart/${product.id}`} method="POST" className="mr-2">
                                                <Link key={product.id} to={`/cart/${product.id}`} className="btn btn-sm text-dark p-0">
                                                    <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                                                </Link>
                                            </form>
                                            <form action={`/order/${product.id}`} method="POST">
                                                <Link key={product.id} to={`/order/${product.id}`} className="btn btn-sm btn-primary">
                                                    <i className="fas fa-credit-card text-light mr-1"></i>Buy Now
                                                </Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No products found.</div> // Display a message if products array is empty
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
