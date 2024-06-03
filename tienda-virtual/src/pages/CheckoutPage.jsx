import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
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
    const { cart, clearCart } = useContext(CartContext);
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

    const handleCheckout = () => {
        const orderData = {
            user: user.username,
            products: cart,
            shippingInfo,
            date: new Date().toISOString(),
        };

        // Guarda la compra en localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        clearCart();
        navigate('/order-confirmation');
    };

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
                            <li key={item.id}>{item.title} - ${item.price}</li>
                        ))}
                    </ul>
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
