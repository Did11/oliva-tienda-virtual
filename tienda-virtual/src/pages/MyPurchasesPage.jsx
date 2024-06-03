// src/pages/MyPurchasesPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyPurchasesPage = () => {
    const { user } = useAuth();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            const response = await axios.get('/api/orders');
            const userPurchases = response.data.filter(order => order.user === user.username);
            setPurchases(userPurchases);
        };

        fetchPurchases();
    }, [user]);

    return (
        <div>
            <h1>Mis Compras</h1>
            {purchases.length === 0 ? (
                <p>No hay compras realizadas.</p>
            ) : (
                <ul>
                    {purchases.map((purchase, index) => (
                        <li key={index}>
                            <h2>Compra realizada el {purchase.date}</h2>
                            <p>Enviado a: {purchase.shippingInfo.address}, {purchase.shippingInfo.city}, {purchase.shippingInfo.province}, {purchase.shippingInfo.country}</p>
                            <p>Productos:</p>
                            <ul>
                                {purchase.products.map(product => (
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
