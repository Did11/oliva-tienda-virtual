import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import '../styles/Cart.css'; 

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="container cart-container">
      <ul className="list-group">
        {cart.map((product) => (
          <li key={product.id} className="list-group-item cart-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="cart-item-info">
                <img src={product.image} alt={product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h5>{product.title}</h5>
                  <p>${product.price}</p>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
