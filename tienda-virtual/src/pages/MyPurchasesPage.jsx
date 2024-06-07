import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/MyPurchases.css'; 

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

    const calculateTotal = (products, shippingCost) => {
        const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
        return (subtotal + shippingCost).toFixed(2);
    };

    return (
        <div className="my-purchases">
            {orders.length === 0 ? (
                <p>No has realizado ninguna compra.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="purchase">
                        <h3>Compra realizada el {new Date(order.date).toLocaleDateString()}</h3>
                        <p><strong>Envío a: </strong> {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.province}, {order.shippingInfo.country}</p>
                        <h3>Productos: </h3>
                        <ul>
                            {order.products.map((product) => (
                                <li key={product.id} className="product">
                                    <img src={product.image} alt={product.title} className="product-image" />
                                    <div className="product-details">
                                        <p>{product.title} - ${product.price.toFixed(2)} x {product.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total: </strong> ${calculateTotal(order.products, order.shippingCost)}</p>
                        <p><strong>Estado: </strong> En camino</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyPurchasesPage;
