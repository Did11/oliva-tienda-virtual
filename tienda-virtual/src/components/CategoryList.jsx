// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  return (
    <div className="container">
      <h1>Categories</h1>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category} className="list-group-item">
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
