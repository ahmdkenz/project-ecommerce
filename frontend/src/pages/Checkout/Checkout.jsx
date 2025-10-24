// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { 
    cart, 
    getSubtotal, 
    formatRupiah, 
    clearCart 
  } = useCart();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    alamat: '',
    kota: '',
    kode_pos: '',
    telepon: '',
    payment_method: 'bank_transfer'
  });
  
  // Biaya pengiriman tetap
  const shippingCost = 50000;
  
  // Hitung total belanja (subtotal + biaya pengiriman)
  const getTotal = () => {
    return getSubtotal();
  };
  
  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulasi pemrosesan checkout
    alert(`Terima kasih ${formData.nama_lengkap}! Pesanan Anda telah berhasil diproses.`);
    
    // Clear cart dan redirect ke halaman utama
    clearCart();
    navigate('/');
  };

  // Jika keranjang kosong, redirect ke halaman cart
  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Keranjang belanja Anda kosong</h2>
        <p>Silakan tambahkan produk ke keranjang terlebih dahulu.</p>
        <Link to="/products" className="btn btn-primary">Belanja Sekarang</Link>
      </div>
    );
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Proses Checkout</h1>
          <p>Selesaikan pesanan Anda dalam beberapa langkah mudah.</p>
        </div>
      </section>

      <section className="checkout-section">
        <div className="container">
          <div className="checkout-layout">
            {/* Kolom Kiri: Informasi Pengiriman & Pembayaran */}
            <div className="checkout-form">
              <form onSubmit={handleSubmit}>
                {/* Informasi Pengiriman */}
                <div className="form-section">
                  <h2 className="form-section-title">
                    <i className="fas fa-truck"></i> Informasi Pemesanan
                  </h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="nama_lengkap">Nama Lengkap</label>
                      <input 
                        type="text" 
                        id="nama_lengkap" 
                        name="nama_lengkap"
                        className="form-input" 
                        placeholder="Masukkan nama lengkap Anda" 
                        required
                        value={formData.nama_lengkap}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="alamat">Alamat Lengkap</label>
                      <textarea 
                        id="alamat" 
                        name="alamat"
                        className="form-input" 
                        rows="3" 
                        placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan" 
                        required
                        value={formData.alamat}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="kota">Kota/Kabupaten</label>
                      <input 
                        type="text" 
                        id="kota" 
                        name="kota"
                        className="form-input" 
                        required
                        value={formData.kota}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="kode_pos">Kode Pos</label>
                      <input 
                        type="text" 
                        id="kode_pos" 
                        name="kode_pos"
                        className="form-input" 
                        required
                        value={formData.kode_pos}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="telepon">Nomor Telepon</label>
                      <input 
                        type="tel" 
                        id="telepon" 
                        name="telepon"
                        className="form-input" 
                        placeholder="0812xxxxxxxx" 
                        required
                        value={formData.telepon}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                

                {/* Kolom Kanan: Ringkasan Pesanan */}
                <aside className="cart-summary checkout-summary">
                  <h2>Ringkasan Pesanan</h2>
                  
                  {/* Mini Cart Items */}
                  {cart.map(item => (
                      <div className="mini-cart-item" key={`${item.id}-${item.title}`}>
                      <img src={item.image || "https://via.placeholder.com/50x50"} alt={item.title || item.name} />
                      <div>
                        <span>{item.title || item.name} (x{item.quantity})</span><br />
                        <small>{formatRupiah(
                          (typeof item.price === 'string' 
                            ? parseInt(item.price.replace(/[^\d]/g, ""))
                            : item.price) * item.quantity
                        )}</small>
                      </div>
                    </div>
                  ))}
                  <hr className="summary-divider" />

                  {/* Detail Harga */}
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatRupiah(getSubtotal())}</span>
                  </div>
                  
                  <div className="summary-row total">
                    <span>Total Pembayaran</span>
                    <span>{formatRupiah(getTotal())}</span>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-accent btn-full-width checkout-btn place-order-btn"
                  >
                    <i className="fas fa-lock"></i> Buat Pesanan Sekarang
                  </button>
                </aside>

              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;