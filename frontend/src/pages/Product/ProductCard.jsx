import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`${product.title || product.name} telah ditambahkan ke keranjang`);
  };

  const handleOrderNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
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
          onClick={handleOrderNow}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          <i className="fas fa-shopping-bag"></i> Order Now
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