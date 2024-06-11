import React, { useState } from 'react';

const PaymentInfo = ({ shippingInfo, handleInputChange, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({});

    const handleExpirationDateChange = (e) => {
        let { value } = e.target;
        value = value.replace(/\D/g, ''); 
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '$1');
        } else if (value.length <= 4) {
            value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        handleInputChange({ target: { name: 'expirationDate', value } });
    };

    const validateExpirationDate = () => {
        const [month, year] = shippingInfo.expirationDate.split('/');
        if (!month || !year || month > 12) return false;

        const expirationDate = new Date(`20${year}`, month - 1);
        const currentDate = new Date();

        return expirationDate >= currentDate;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!/^[0-9]{16}$/.test(shippingInfo.cardNumber)) {
            newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
        }
        if (!/^[0-9]{3,4}$/.test(shippingInfo.securityCode)) {
            newErrors.securityCode = 'El CVV debe tener 3 o 4 dígitos.';
        }
        if (!validateExpirationDate()) {
            newErrors.expirationDate = 'La fecha de vencimiento debe ser válida y en el futuro. El mes debe ser entre 01 y 12.';
        }
        return newErrors;
    };

    const handleNext = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onNext();
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="checkout-section">
            <h2>Información de Pago</h2>
            <form className="shipping-form">
                <div className="form-group">
                    <label>Número de Tarjeta:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={shippingInfo.cardNumber}
                        onChange={handleInputChange}
                    />
                    {errors.cardNumber && <span>{errors.cardNumber}</span>}
                </div>
                <div className="form-group">
                    <label>Código de Seguridad:</label>
                    <input
                        type="text"
                        name="securityCode"
                        value={shippingInfo.securityCode}
                        onChange={handleInputChange}
                    />
                    {errors.securityCode && <span>{errors.securityCode}</span>}
                </div>
                <div className="form-group">
                    <label>Fecha de Vencimiento (MM/AA):</label>
                    <input
                        type="text"
                        name="expirationDate"
                        value={shippingInfo.expirationDate}
                        onChange={handleExpirationDateChange}
                        maxLength="5"
                        placeholder="MM/AA"
                    />
                    {errors.expirationDate && <span>{errors.expirationDate}</span>}
                </div>
                <button type="button" onClick={handleNext} className="checkout-button">Continuar</button>
                <button type="button" onClick={onPrevious} className="checkout-button">Volver</button>
            </form>
        </div>
    );
};

export default PaymentInfo;
