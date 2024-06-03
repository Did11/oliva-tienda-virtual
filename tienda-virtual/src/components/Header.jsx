// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
