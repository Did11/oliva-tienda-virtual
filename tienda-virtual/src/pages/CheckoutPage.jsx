// src/pages/CheckoutPage.jsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useAuth();
    const [shippingInfo, setShippingInfo] = useState({
        city: '',
        province: '',
        country: '',
        address: '',
        name: '',
        phone: '',
        cardNumber: '',
        securityCode: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckout = async () => {
        const orderData = {
            user: user.username,
            products: cartItems,
            shippingInfo,
            date: new Date().toISOString(),
        };

        await axios.post('/api/orders', orderData); // Endpoint para guardar la compra en el archivo JSON
        clearCart();
        navigate('/order-confirmation');
    };

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <h2>Productos en el carrito</h2>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>{item.title} - ${item.price}</li>
                        ))}
                    </ul>
                    <h2>Información de Envío</h2>
                    <form>
                        {Object.keys(shippingInfo).map((key) => (
                            <div key={key}>
                                <label>{key}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={shippingInfo[key]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </form>
                    <button onClick={handleCheckout}>Comprar</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
