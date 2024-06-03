// src/components/ProductButton.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export const AddToCartButton = ({ product, quantity, onAddToCart }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onAddToCart(product, quantity);
  };

  return (
    <button onClick={handleAddToCart} className="btn btn-success">
      Add {quantity} {quantity > 1 ? 'units' : 'unit'} to Cart
    </button>
  );
};

export const ViewDetailsButton = ({ productId }) => {
  return (
    <Link to={`/product/${productId}`} className="btn btn-primary">
      View Details
    </Link>
  );
};
