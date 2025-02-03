// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from '../Product/Product';
import CartModal from '../Cart/CartModal';
import NavLinks from './NavLinks/NavLinks'; // Import NavLinks component
import CategoriesSidebar from './Category/CategoriesSidebar'; // Import CategoriesSidebar component

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { categoryId } = useParams();

  const [auth, setAuth] = useState(false); // Manage authentication status

  useEffect(() => {
    fetch('https://ram.freelogomaker.in/api/category')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        console.log("Categories fetched:", data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        {/* Categories Sidebar */}
        <CategoriesSidebar categories={categories} />

        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
              </h1>
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              {/* Navigation Links */}
              <NavLinks auth={auth} setIsCartOpen={setIsCartOpen} />

              <div className="navbar-nav ml-auto py-0">
                {auth ? (
                  <Link to="/logout" className="nav-item nav-link">Logout</Link>
                ) : (
                  <>
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                    <Link to="/register" className="nav-item nav-link">Register</Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* Image Slider */}
          <Product categoryId={categoryId} />
          {/* Cart Modal (conditionally rendered) */}
          {isCartOpen && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
