import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <h2 className="text-center">Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <div className="card">
              <img src={categoryImages[category]} className="card-img-top" alt={category} />
              <div className="card-body">
                <h5 className="card-title text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                <Link to={`/category/${category}`} className="btn btn-primary btn-block">Shop Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
