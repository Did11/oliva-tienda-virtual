import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import '../styles/Cart.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container cart-container mt-4">
      <h2 className="text-center">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <div className="list-group">
          {cart.map((item) => (
            <div key={item.id} className="list-group-item cart-item">
              <div className="cart-item-info">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h5>{item.title}</h5>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="cart-item-actions">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  min="1"
                />
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="list-group-item d-flex justify-content-end">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
          <div className="list-group-item d-flex justify-content-end">
            <button onClick={handleCheckout} className="btn btn-primary">
              Realizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
