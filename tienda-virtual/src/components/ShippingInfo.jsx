import React, { useEffect, useState } from 'react';
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
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};
        if (!shippingInfo.name) newErrors.name = 'El nombre es requerido.';
        if (!shippingInfo.phone) newErrors.phone = 'El teléfono es requerido.';
        if (!shippingInfo.country) newErrors.country = 'El país es requerido.';
        if (!shippingInfo.province) newErrors.province = 'La provincia es requerida.';
        if (!shippingInfo.city) newErrors.city = 'La ciudad es requerida.';
        if (!shippingInfo.address) newErrors.address = 'La dirección es requerida.';
        if (!shippingInfo.postalCode) newErrors.postalCode = 'El código postal es requerido.';
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
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                    />
                    {errors.phone && <span>{errors.phone}</span>}
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
                    {errors.country && <span>{errors.country}</span>}
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
                    {errors.province && <span>{errors.province}</span>}
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                    />
                    {errors.city && <span>{errors.city}</span>}
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <span>{errors.address}</span>}
                </div>
                <div className="form-group">
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                    />
                    {errors.postalCode && <span>{errors.postalCode}</span>}
                </div>
                <button type="button" onClick={handleNext} className="checkout-button">Continuar</button>
            </form>
        </div>
    );
};

export default ShippingInfo;
