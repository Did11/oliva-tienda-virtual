import React from 'react';

const PersonalInfo = ({ shippingInfo, handleInputChange, onNext, onPrevious }) => (
    <div className="checkout-section">
        <h2>Información Personal</h2>
        <form className="shipping-form">
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={onNext} className="checkout-button">Continuar</button>
            <button onClick={onPrevious} className="checkout-button">Volver</button>
        </form>
    </div>
);

export default PersonalInfo;
