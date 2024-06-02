// src/components/ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => (
  <div className="container">
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4">
          <div className="card mb-4">
            <img src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductList;
