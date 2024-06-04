// src/components/ProductDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import './ProductDetail.css';
import ConfirmationModal from './ConfirmationModal';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
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
        setQuantity(1); // Reiniciar la cantidad después de cerrar el modal
    };

    const handleBackToCategory = () => {
        navigate(`/category/${product.category}`);
    };

    const productInCart = cart.find(item => item.id === product.id);
    const productQuantityInCart = productInCart ? productInCart.quantity : 0;

    return (
        <div className="container mt-4">
            <h2 className="text-center">{product.title}</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <img src={product.image} className="img-product-detail" alt={product.title} />
                </div>
                <div className="col-md-6">
                    <h3>{product.price}</h3>
                    <p>{product.description}</p>
                    <div className="quantity-control">
                        <button onClick={decrementQuantity} className="btn btn-secondary">-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                        <button onClick={incrementQuantity} className="btn btn-secondary">+</button>
                        <button onClick={handleAddToCart} className="btn btn-success ml-2">Agregar al carrito</button>
                    </div>
                    <p className="mt-3">
                        {productQuantityInCart > 0
                            ? `Actualmente tienes ${productQuantityInCart} unidad(es) de este producto en tu carrito.`
                            : "Todavía no tienes este producto en tu carrito."}
                    </p>
                    <button onClick={handleBackToCategory} className="btn btn-primary mt-3">Volver a Categoría</button>
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
