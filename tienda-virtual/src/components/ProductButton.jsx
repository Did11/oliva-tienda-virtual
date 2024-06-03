// src/components/ProductButton.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export const AddToCartButton = ({ product, quantity }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product, quantity)} className="btn btn-success">
      Agregar {quantity} {quantity > 1 ? 'unidades' : 'unidad'}
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
