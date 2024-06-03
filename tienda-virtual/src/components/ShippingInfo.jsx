import React, { useEffect } from 'react';
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

const ShippingInfo = ({ shippingInfo, handleInputChange, handleCountryChange, onNext }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (user && !shippingInfo.initialized) {
            handleInputChange({ target: { name: 'name', value: `${user.name.firstname} ${user.name.lastname}` } });
            handleInputChange({ target: { name: 'phone', value: user.phone } });
            handleInputChange({ target: { name: 'address', value: `${user.address.number} ${user.address.street}` } });
            handleInputChange({ target: { name: 'city', value: user.address.city } });
            handleInputChange({ target: { name: 'postalCode', value: user.address.zipcode } });
            handleCountryChange({ target: { name: 'country', value: 'US' } });
            handleInputChange({ target: { name: 'province', value: 'California' } });
            handleInputChange({ target: { name: 'initialized', value: true } });
        }
    }, [user, handleInputChange, handleCountryChange, shippingInfo.initialized]);

    return (
        <div className="checkout-section">
            <h2>Información de Envío</h2>
            <form className="shipping-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={onNext} className="checkout-button">Continuar</button>
            </form>
        </div>
    );
};

export default ShippingInfo;
