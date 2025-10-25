import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="card-image-container">
        <img 
          src={product.image} 
          alt={product.title || product.name}
          className="card-image"
        />
      </Link>
      
      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <Link to={`/products/${product.slug}`} className="card-title-link">
          <h3 className="card-title">{product.title || product.name}</h3>
        </Link>
        <p className="card-price">
          Rp {Number(product.price).toLocaleString('id-ID')}
        </p>
      </div>

      <div className="card-actions">
        <Link 
          to={`/products/${product.slug}`} 
          className="btn btn-secondary"
        >
          Detail
        </Link>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
        >
          <FaShoppingCart className="cart-icon" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;