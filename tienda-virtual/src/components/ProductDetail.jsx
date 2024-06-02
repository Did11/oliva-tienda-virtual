// src/components/ProductDetail.jsx
import React from 'react';
import { AddToCartButton } from './ProductButton.jsx';

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <h2>${product.price}</h2>
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductDetail;
