// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail.jsx';
import { getProduct } from '../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct).catch((error) => {
      console.error('Error fetching product:', error);
    });
  }, [id]);

  return (
    <div>
      {product ? <ProductDetail product={product} /> : <p>Loading...</p>}
    </div>
  );
};

export default ProductPage;
