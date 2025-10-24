import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`${product.title || product.name} telah ditambahkan ke keranjang`);
  };

  return (
    <div className="product-card">
      <div className="card-image-container">
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <img 
          src={product.image} 
          alt={product.title || product.name}
          className="card-image"
        />
      </div>
      
      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title || product.name}</h3>
        <p className="card-price">
          Rp {Number(product.price).toLocaleString('id-ID')}
        </p>
      </div>

      <div className="card-actions">
        <Link 
          to={`/products/${product.slug}`} 
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          Detail
        </Link>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          <i className="fas fa-first-order"></i> Order Now
        </button>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;