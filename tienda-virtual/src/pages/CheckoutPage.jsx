import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ShippingInfo from '../components/ShippingInfo';
import PersonalInfo from '../components/PersonalInfo';
import PaymentInfo from '../components/PaymentInfo';
import OrderConfirmation from '../components/OrderConfirmation';
import './CheckoutPage.css';

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
        expirationDate: '',
        initialized: false, // Añadir campo para controlar si la información del usuario ha sido precargada
    });
    const [step, setStep] = useState(1);

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
            province: '',
        }));
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleCheckout = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const shippingCost = parseFloat(calculateShippingCost(subtotal));
        const total = (subtotal + shippingCost).toFixed(2);
    
        const orderData = {
            user: user.username,
            products: cart,
            shippingInfo,
            date: new Date().toISOString(),
            subtotal,
            shippingCost,
            total
        };
    
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
    
        clearCart();
        navigate('/order-confirmation');
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateShippingCost = (subtotal) => {
        if (subtotal < 50) return (subtotal * 0.20).toFixed(2);
        if (subtotal < 200) return (subtotal * 0.18).toFixed(2);
        if (subtotal < 300) return (subtotal * 0.16).toFixed(2);
        if (subtotal < 500) return (subtotal * 0.14).toFixed(2);
        if (subtotal < 600) return (subtotal * 0.1).toFixed(2);
        if (subtotal < 800) return (subtotal * 0.05).toFixed(2);
        return (subtotal * 0.03).toFixed(2);
    };

    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost = parseFloat(calculateShippingCost(subtotal));
    const total = (subtotal + shippingCost).toFixed(2);

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            {step === 1 && (
                <ShippingInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange}
                    handleCountryChange={handleCountryChange}
                    onNext={handleNextStep} 
                />
            )}
            {step === 2 && (
                <PersonalInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange} 
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep} 
                />
            )}
            {step === 3 && (
                <PaymentInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange} 
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep} 
                />
            )}
            {step === 4 && (
                <OrderConfirmation 
                    shippingInfo={shippingInfo} 
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    total={total}
                    onConfirm={handleCheckout}
                    onPrevious={handlePreviousStep} 
                />
            )}
        </div>
    );
};

export default CheckoutPage;
