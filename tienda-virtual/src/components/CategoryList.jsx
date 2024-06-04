// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css';


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => {
        setCategories(response.data);
        response.data.forEach(category => {
          axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => {
              setCategoryImages(prevState => ({
                ...prevState,
                [category]: res.data[0].image
              }));
            })
            .catch(error => {
              console.error(`Error fetching products for category ${category}:`, error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Categorías</h2>
      <div className="row justify-content-center">
        {categories.map((category, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card">
              <img src={categoryImages[category]} className="card-img-top" alt={category} />
              <div className="card-body">
                <h5 className="card-title text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                <Link to={`/category/${category}`} className="btn btn-primary btn-block">Seleccionar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
