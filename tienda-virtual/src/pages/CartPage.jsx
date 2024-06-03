// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="list-group">
          {cart.map((item) => (
            <div key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="list-group-item d-flex justify-content-end">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
