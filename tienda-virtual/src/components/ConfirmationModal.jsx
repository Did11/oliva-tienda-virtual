// src/components/ConfirmationModal.jsx
import React from 'react';
import '../App.css'; 

const ConfirmationModal = ({ show, handleClose, product, quantity }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>×</button>
        <h2>Product Added to Cart</h2>
        <p>{quantity} unit(s) of {product.title} have been added to your cart.</p>
        <div className="modal-actions">
          <button onClick={handleClose}>Back to Details</button>
          <button onClick={() => window.location.href = '/cart'}>Go to Cart</button>
          <button onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
