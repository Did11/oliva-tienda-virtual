// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css'; // Asegúrate de ajustar la ruta
import { AddToCartButton } from './ProductButton.jsx'; // Importa el botón de agregar al carrito

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details!', error);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">{product.title}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={product.image} className="img-product-detail" alt={product.title} />
        </div>
        <div className="col-md-6">
          <h3>{product.price}</h3>
          <p>{product.description}</p>
          <AddToCartButton product={product} /> {/* Añade el botón de agregar al carrito */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
