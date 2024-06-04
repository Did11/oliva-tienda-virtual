import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import ConfirmationModal from './ConfirmationModal';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { cart, addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error al obtener los detalles del producto', error));
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        const currentQuantity = quantity;
        addToCart(product, currentQuantity);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setQuantity(1);
    };

    const handleBackToCategory = () => {
        navigate(`/category/${product.category}`);
    };

    const productInCart = cart.find(item => item.id === product.id);
    const productQuantityInCart = productInCart ? productInCart.quantity : 0;

    return (
        <div className="container product-detail-container mt-4">
            <h2 className="product-title">{product.title}</h2>
            <div className="product-detail">
                <div className="product-image-container">
                    <img src={product.image} className="product-detail-image" alt={product.title} />
                </div>
                <div className="product-info">
                    <h3 className="product-price">${product.price}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="quantity-control">
                        <button onClick={decrementQuantity} className="btn btn-secondary">-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                        <button onClick={incrementQuantity} className="btn btn-secondary">+</button>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleAddToCart} className="btn btn-success">Agregar al carrito</button>
                        <button onClick={handleBackToCategory} className="btn btn-primary">Volver a Categoría</button>
                    </div>
                    <p className="product-quantity-info">
                        {productQuantityInCart > 0
                            ? `Actualmente tienes ${productQuantityInCart} unidad(es) de este producto en tu carrito.`
                            : "Todavía no tienes este producto en tu carrito."}
                    </p>
                </div>
            </div>
            <ConfirmationModal
                show={showModal}
                handleClose={handleCloseModal}
                product={product}
                quantity={quantity}
            />
        </div>
    );
};

export default ProductDetail;
