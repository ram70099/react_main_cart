import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you're using axios to make API calls
import Swal from 'sweetalert2';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    categories: [],
  });

  // Fetch the footer data from the backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('https://ram.freelogomaker.in/api/category'); // Replace with actual API endpoint
        setFooterData({ categories: response.data.categories.slice(0, 3) }); // Show only 3 categories
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load footer data.',
          icon: 'error',
        });
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div>
      {/* Footer Categories Section */}
      <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
        {/* Footer Categories Section */}
        <div className="row px-xl-5 pb-3">
          {footerData.categories.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 pb-1">
              <div
                className="cat-item d-flex flex-column border mb-4"
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <p className="text-right" style={{ fontWeight: 'bold', color: '#007bff', fontSize: '14px' }}>3 Products</p>
                <a href={`/shop/${category.id}`} className="cat-img position-relative overflow-hidden mb-3" style={{ marginBottom: '20px' }}>
                <img
                    className="img-fluid"
                    src={category.image}
                    alt={category.categoryname}
                    style={{
                      height: '400px', // Slightly fixed image height for consistency
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      marginBottom: '15px', // Push the image slightly up
                    }}
                  />
                </a>
                <h5 className="font-weight-bold m-0" style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>
                  {category.categoryname}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
