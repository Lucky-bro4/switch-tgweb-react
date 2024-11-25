import React from 'react';
import './ProductModal.css';

const ProductModal = ({product, onClose}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} className="product-image" />
                <p><strong>Описание:</strong> {product.description}</p>
                <p><strong>Цена аренды:</strong> {product.rentPrice} Р</p>
            </div>
        </div>
    );
};

export default ProductModal;