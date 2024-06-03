// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://fakestoreapi.com/products`)
        .then(response => {
          const filteredProducts = response.data.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h2>Search Results for: {searchTerm}</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
