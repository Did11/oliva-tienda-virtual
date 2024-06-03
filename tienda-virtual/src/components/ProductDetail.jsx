// src/components/ProductDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { AddToCartButton } from './ProductButton.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import { CartContext } from '../context/CartContext.jsx'; // Importa el contexto del carrito

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { cart } = useContext(CartContext); // Accede al contexto del carrito

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details!', error));
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (product, quantity) => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Encuentra la cantidad del producto en el carrito
  const productInCart = cart.find(item => item.id === product.id);
  const productQuantityInCart = productInCart ? productInCart.quantity : 0;

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
            />
            <button onClick={incrementQuantity} className="btn btn-secondary">+</button>
          </div>
          <AddToCartButton product={product} quantity={quantity} onAddToCart={handleAddToCart} />
          <p className="mt-3">
            {productQuantityInCart > 0
              ? `Currently you have ${productQuantityInCart} unit(s) of this product in your cart.`
              : "You don't have this product in your cart yet."}
          </p>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        product={product}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetail;
