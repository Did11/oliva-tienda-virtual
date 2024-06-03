// src/pages/MyPurchasesPage.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MyPurchasesPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = () => {
            const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
            const userOrders = allOrders.filter(order => order.user === user.username);
            setOrders(userOrders);
        };
        fetchOrders();
    }, [user]);

    return (
        <div>
            <h1>Mis Compras</h1>
            {orders.length === 0 ? (
                <p>No has realizado ninguna compra.</p>
            ) : (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <h2>Compra realizada el {new Date(order.date).toLocaleDateString()}</h2>
                            <p>Envío a: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.province}, {order.shippingInfo.country}</p>
                            <h3>Productos:</h3>
                            <ul>
                                {order.products.map((product) => (
                                    <li key={product.id}>{product.title} - ${product.price}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPurchasesPage;
