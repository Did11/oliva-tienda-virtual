// src/components/ProductList.jsx
import React from 'react';
import { AddToCartButton, ViewDetailsButton } from './ProductButton.jsx';

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <div className="d-flex justify-content-between">
                  <ViewDetailsButton productId={product.id} />
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
