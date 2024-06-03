// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error al obtener las categorías:', error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = `?searchTerm=${encodeURIComponent(searchTerm.trim())}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
        navigate(`/search${query}`);
    };

    const handleLogin = async () => {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            login(user);
            setShowLogin(false);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <header className="App-header">
            <Link to="/" className="header-logo">Tienda Virtual</Link>
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="">Todas</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </div>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/cart">Carrito</Link></li>
                    {user ? (
                        <>
                            <li><Link to="/my-purchases">Mis Compras</Link></li>
                            <li><Link to="/account">Cuenta</Link></li>
                            <li><button onClick={logout}>Cerrar Sesión</button></li>
                        </>
                    ) : (
                        <li><button onClick={() => setShowLogin(!showLogin)}>Cuenta</button></li>
                    )}
                </ul>
            </nav>
            {showLogin && (
                <div>
                    <h2>Iniciar Sesión</h2>
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                </div>
            )}
        </header>
    );
};

export default Header;
