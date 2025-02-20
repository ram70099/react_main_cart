import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Footer = () => {
  return (
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <a href="/" className="text-decoration-none">
            <h1 className="mb-4 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper
            </h1>
          </a>
          <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
          <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
          <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
          <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-dark mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                <Link className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                <Link className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Shop Detail</Link>
                <Link className="text-dark mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                <Link className="text-dark" to="/"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-dark mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                <Link className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                <Link className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Shop Detail</Link>
                <Link className="text-dark mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                <Link className="text-dark" to="/"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row border-top border-light mx-xl-5 py-4">
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-dark">
            &copy; <a className="text-dark font-weight-semi-bold" href="/">E Shopper</a>. All Rights Reserved. Designed by
            <a className="text-dark font-weight-semi-bold" href="/" target="_blank" rel="noopener noreferrer">Ram Rattan</a><br />
            Distributed By <a href="/" target="_blank" rel="noopener noreferrer">E Shopper</a>
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="img/payments.png" alt="Payments" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
