// src/components/ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css'; // Asegúrate de que esta línea esté presente

const ProductList = ({ products }) => (
  <div className="product-list-container">
    {products.map(product => (
      <div key={product.id} className="product-item">
        <img src={product.image} alt={product.title} />
        <h3 className="product-item-title">{product.title}</h3>
        <p className="product-item-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="product-item-button">Ver detalles</Link>
      </div>
    ))}
  </div>
);

export default ProductList;
