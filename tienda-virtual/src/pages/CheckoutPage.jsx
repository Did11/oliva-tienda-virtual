// src/pages/CheckoutPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    // Agrega más países según sea necesario
];

const provinces = {
    US: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        // Agrega más estados según sea necesario
    ],
    CA: [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
        // Agrega más provincias según sea necesario
    ],
    MX: [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City',
        // Agrega más estados según sea necesario
    ],
};

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [shippingInfo, setShippingInfo] = useState({
        country: '',
        province: '',
        city: '',
        address: '',
        postalCode: '',
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

    const handleCountryChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevState) => ({
            ...prevState,
            [name]: value,
            province: '', // Reset province when country changes
        }));
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateShippingCost = (subtotal) => {
        if (subtotal < 50) return subtotal * 0.30;
        if (subtotal >= 50 && subtotal < 100) return subtotal * 0.25;
        if (subtotal >= 100 && subtotal < 200) return subtotal * 0.20;
        if (subtotal >= 200 && subtotal < 300) return subtotal * 0.15;
        if (subtotal >= 300 && subtotal < 400) return subtotal * 0.10;
        if (subtotal >= 400 && subtotal < 600) return subtotal * 0.10;
        if (subtotal >= 600 && subtotal < 1000) return subtotal * 0.05;
        return subtotal * 0.025;
    };

    const handleCheckout = () => {
        const subtotal = calculateSubtotal();
        const shippingCost = calculateShippingCost(subtotal);
        const total = subtotal + shippingCost;

        const orderData = {
            user: user.username,
            products: cart,
            shippingInfo,
            subtotal: subtotal.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            total: total.toFixed(2),
            date: new Date().toISOString(),
        };

        // Save the order in localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        clearCart();
        navigate('/order-confirmation');
    };

    const subtotal = calculateSubtotal();
    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + shippingCost;

    return (
        <div>
            <h1>Checkout</h1>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <h2>Productos en el carrito</h2>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>{item.title} - ${item.price} x {item.quantity}</li>
                        ))}
                    </ul>
                    <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
                    <h3>Costo de Envío: ${shippingCost.toFixed(2)}</h3>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <h2>Información de Envío</h2>
                    <form>
                        <div>
                            <label>Country:</label>
                            <select
                                name="country"
                                value={shippingInfo.country}
                                onChange={handleCountryChange}
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Province:</label>
                            <select
                                name="province"
                                value={shippingInfo.province}
                                onChange={handleInputChange}
                                disabled={!shippingInfo.country}
                            >
                                <option value="">Select Province</option>
                                {shippingInfo.country && provinces[shippingInfo.country].map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>City:</label>
                            <input
                                type="text"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Postal Code:</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={shippingInfo.postalCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={shippingInfo.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Card Number:</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={shippingInfo.cardNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Security Code:</label>
                            <input
                                type="text"
                                name="securityCode"
                                value={shippingInfo.securityCode}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button onClick={handleCheckout}>Comprar</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
