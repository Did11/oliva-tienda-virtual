// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { AddToCartButton } from './ProductButton.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details!', error);
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
          <div className="quantity-control">
            <button onClick={decrementQuantity} className="btn btn-secondary">-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
              min="1"
            />
            <button onClick={incrementQuantity} className="btn btn-secondary">+</button>
          </div>
          <AddToCartButton product={product} quantity={quantity} /> {/* Pasa la cantidad al botón */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
