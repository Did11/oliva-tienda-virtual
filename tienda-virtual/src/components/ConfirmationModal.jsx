// src/components/ConfirmationModal.jsx
import React from 'react';
import '../App.css'; // Importa App.css para los estilos del modal

const ConfirmationModal = ({ show, handleClose, product, quantity }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>×</button>
        <h2>¡Producto añadido al carrito!</h2>
        <p>Has añadido {quantity} unidad(es) de <strong>{product.title}</strong> a tu carrito de compras.</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleClose}>Volver a la página de {product.title}</button>
          <button className="btn btn-primary" onClick={() => window.location.href = '/cart'}>Ver tu carrito de compras</button>
          <button className="btn btn-success" onClick={() => window.location.href = '/'}>Ir a Inicio</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
