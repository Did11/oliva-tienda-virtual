// src/components/ProductDetail.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const ProductDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <h2>${product.price}</h2>
      <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
