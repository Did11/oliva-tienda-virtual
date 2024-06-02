// src/components/ProductButton.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product)} className="btn btn-success">
      Agregar una unidad
    </button>
  );
};

export const ViewDetailsButton = ({ productId }) => {
  return (
    <Link to={`/product/${productId}`} className="btn btn-primary">
      Detalles
    </Link>
  );
};
