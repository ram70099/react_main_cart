// CategoriesSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function CategoriesSidebar({ categories }) {
  return (
    <div className="col-lg-3 d-none d-lg-block">
      <a
        className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
        data-toggle="collapse"
        href="#navbar-vertical"
        style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
      >
        <h6 className="m-0">Categories</h6>
      </a>
      <nav
        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
        id="navbar-vertical"
      >
        <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
          {categories.map((category) => (
            <Link key={category.id} to={`/shop/${category.id}`} className="nav-item nav-link">
              {category.categoryname}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default CategoriesSidebar;
