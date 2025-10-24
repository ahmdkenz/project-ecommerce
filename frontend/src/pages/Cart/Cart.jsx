// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getSubtotal, 
    formatRupiah 
  } = useCart();

  // Biaya pengiriman tetap
  const shippingCost = 50000;
  
  // Hitung total belanja (subtotal + biaya pengiriman)
  const getTotal = () => {
    return getSubtotal() + shippingCost;
  };

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Keranjang Belanja Anda</h1>
          <p>Periksa kembali pesanan Anda sebelum melanjutkan.</p>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
              <h2>Keranjang Belanja Anda Kosong</h2>
              <p style={{ marginBottom: '1.5rem' }}>Anda belum menambahkan produk apapun ke keranjang.</p>
              <Link to="/products" className="btn btn-primary">
                Belanja Sekarang
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items-list">
                  {cart.map((item, index) => (
                  <div className="cart-item" key={item.uniqueId} style={{ animationDelay: `${0.1 * index}s` }}>
                    <div className="cart-item-image">
                      <img src={item.image || "https://via.placeholder.com/100x100"} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.title || item.name}</h3>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <div className="quantity-selector">
                        <button 
                          className="btn-qty decrease" 
                          aria-label="Kurangi jumlah"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          min="1"
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 1;
                            if (newQuantity >= 1) {
                              updateQuantity(item.uniqueId, newQuantity);
                            }
                          }}
                          className="qty-input" 
                        />
                        <button 
                          className="btn-qty increase" 
                          aria-label="Tambah jumlah"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="cart-item-total">
                      {formatRupiah(typeof item.price === 'string' ? parseInt(item.price.replace(/[^\d]/g, "")) : item.price * item.quantity)}
                    </p>
                    <button 
                      className="cart-item-remove" 
                      aria-label="Hapus item"
                      onClick={() => removeFromCart(item.uniqueId)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <h2>Ringkasan Pesanan</h2>
                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>{formatRupiah(getSubtotal())}</span>
                </div>
                <div className="summary-row">
                  <span>Biaya Pengiriman</span>
                  <span>{formatRupiah(shippingCost)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatRupiah(getTotal())}</span>
                </div>
                <Link to="/checkout" className="btn btn-accent btn-full-width checkout-btn">
                  <i className="fas fa-shield-alt"></i> Lanjut ke Checkout
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;