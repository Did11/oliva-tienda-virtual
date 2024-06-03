import React from 'react';

const Confirmation = ({ cart, shippingInfo, subtotal, shippingCost, total, handleCheckout, prevStep }) => {
    return (
        <div>
            <h2>Confirmación de Pedido</h2>
            <div className="cart-details">
                <h2>Productos en el carrito</h2>
                <ul className="product-list">
                    {cart.map((item) => (
                        <li key={item.id} className="product-item">
                            <img src={item.image} alt={item.title} className="product-image" />
                            <div className="product-details">
                                {item.title} - ${item.price} x {item.quantity}
                                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3>Subtotal: ${subtotal}</h3>
                <h3>Costo de Envío: ${shippingCost}</h3>
                <h3>Total: ${total}</h3>
            </div>
            <div className="button-group">
                <button onClick={prevStep} className="checkout-button">Anterior</button>
                <button onClick={handleCheckout} className="checkout-button">Confirmar Compra</button>
            </div>
        </div>
    );
};

export default Confirmation;
