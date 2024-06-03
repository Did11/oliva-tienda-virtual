import React from 'react';

const PaymentInfo = ({ shippingInfo, handleInputChange, onNext, onPrevious }) => {
    const handleExpirationDateChange = (e) => {
        let { value } = e.target;
        value = value.replace(/\D/g, ''); // Eliminar todo lo que no sea un dígito
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '$1');
        } else if (value.length <= 4) {
            value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        handleInputChange({ target: { name: 'expirationDate', value } });
    };

    const validateExpirationDate = () => {
        const [month, year] = shippingInfo.expirationDate.split('/');
        if (!month || !year) return false;

        const expirationDate = new Date(`20${year}`, month - 1);
        const currentDate = new Date();

        return expirationDate >= currentDate;
    };

    const handleNext = () => {
        if (!validateExpirationDate()) {
            alert('Se necesita una tarjeta con tiempo válido.');
            return;
        }
        onNext();
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
                </div>
                <div className="form-group">
                    <label>Código de Seguridad:</label>
                    <input
                        type="text"
                        name="securityCode"
                        value={shippingInfo.securityCode}
                        onChange={handleInputChange}
                    />
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
                </div>
                <button type="button" onClick={handleNext} className="checkout-button">Continuar</button>
                <button type="button" onClick={onPrevious} className="checkout-button">Volver</button>
            </form>
        </div>
    );
};

export default PaymentInfo;
