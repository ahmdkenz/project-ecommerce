import React from "react";
import { Link } from "react-router-dom";
import "./Product.css"; // pastikan file ada di src/pages/Product.css

export default function Product() {
  return (
    <div className="product-page">
      <section className="page-header">
        <div className="container">
          <h1>Katalog Produk Kami</h1>
          <p>Temukan teknologi yang Anda butuhkan.</p>
        </div>
      </section>

      <div className="container">
        <div className="product-page-layout">
          <aside className="sidebar-filters">
            <details className="filter-details" open>
              <summary className="filter-summary">
                <h3><i className="fas fa-filter"></i> Filter Produk</h3>
                <i className="fas fa-chevron-down expand-icon" />
              </summary>

              <div className="filter-content">
                <div className="filter-group">
                  <h4>Kategori</h4>
                  <ul className="filter-list">
                    <li><label><input type="checkbox" name="category" value="laptop" /> Laptop</label></li>
                    <li><label><input type="checkbox" name="category" value="pc" /> PC Desktop</label></li>
                    <li><label><input type="checkbox" name="category" value="komponen" /> Komponen</label></li>
                    <li><label><input type="checkbox" name="category" value="monitor" /> Monitor</label></li>
                    <li><label><input type="checkbox" name="category" value="aksesoris" /> Aksesoris</label></li>
                  </ul>
                </div>

                <div className="filter-group">
                  <h4>Rentang Harga</h4>
                  <label htmlFor="price-range" className="price-label">Rp 0 - Rp 50.000.000</label>
                  <input type="range" id="price-range" className="price-slider" min="0" max="50000000" step="100000" defaultValue="25000000" />
                </div>

                <div className="filter-group">
                  <h4>Merek</h4>
                  <ul className="filter-list">
                    <li><label><input type="checkbox" name="brand" value="brandA" /> CyberCore</label></li>
                    <li><label><input type="checkbox" name="brand" value="brandB" /> QuantumLeap</label></li>
                    <li><label><input type="checkbox" name="brand" value="brandC" /> NovaTech</label></li>
                  </ul>
                </div>

                <button className="btn btn-primary btn-full-width">Terapkan Filter</button>
              </div>
            </details>
          </aside>

          <section className="product-grid-container">
            <div className="sort-bar">
              <label htmlFor="sort-by">Urutkan:</label>
              <select id="sort-by" className="sort-select">
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="name-asc">Nama (A-Z)</option>
              </select>
            </div>

            <div className="product-grid">
              {/* Produk statis — nanti bisa diganti map(products) */}
              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/007BFF/FFFFFF?text=Laptop+Futuristik" alt="QuantumLeap Pro X1" />
                  <span className="badge new-badge">BARU</span>
                </div>
                <div className="card-content">
                  <span className="card-category">Laptop</span>
                  <h3>QuantumLeap Pro X1</h3>
                  <p className="card-price">Rp 25.000.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/quantumleap-pro-x1" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>

              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/28a745/FFFFFF?text=Monitor+Gaming" alt="NovaView 4K 144Hz" />
                </div>
                <div className="card-content">
                  <span className="card-category">Monitor</span>
                  <h3>NovaView 4K 144Hz</h3>
                  <p className="card-price">Rp 8.500.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/novaview-4k-144hz" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>

              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/6C757D/FFFFFF?text=VGA+Card" alt="CyberCore RTX 9090" />
                  <span className="badge hot-badge">HOT</span>
                </div>
                <div className="card-content">
                  <span className="card-category">Komponen</span>
                  <h3>CyberCore RTX 9090</h3>
                  <p className="card-price">Rp 32.000.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/cybercore-rtx-9090" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>

              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/ffc107/FFFFFF?text=Keyboard+Mech" alt="AstraGlow K1" />
                </div>
                <div className="card-content">
                  <span className="card-category">Aksesoris</span>
                  <h3>AstraGlow K1</h3>
                  <p className="card-price">Rp 1.800.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/astraglow-k1" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>

              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/17a2b8/FFFFFF?text=PC+Desktop" alt="Orion-9 Assembly" />
                </div>
                <div className="card-content">
                  <span className="card-category">PC Desktop</span>
                  <h3>Orion-9 Assembly</h3>
                  <p className="card-price">Rp 45.000.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/orion-9-assembly" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>

              <article className="product-card">
                <div className="card-image">
                  <img src="https://via.placeholder.com/300x300/fd7e14/FFFFFF?text=Mouse+Gaming" alt="Raptor M-Pro" />
                </div>
                <div className="card-content">
                  <span className="card-category">Aksesoris</span>
                  <h3>Raptor M-Pro</h3>
                  <p className="card-price">Rp 950.000</p>
                </div>
                <div className="card-actions">
                  <Link to="/product/raptor-m-pro" className="btn btn-secondary">Lihat Detail</Link>
                  <button className="btn btn-primary" aria-label="Tambah ke Keranjang"><i className="fas fa-shopping-cart" /></button>
                </div>
              </article>
            </div>

            <nav className="pagination">
              <ul>
                <li><a href="#" className="page-link active">1</a></li>
                <li><a href="#" className="page-link">2</a></li>
                <li><a href="#" className="page-link">3</a></li>
                <li><a href="#" className="page-link">&raquo;</a></li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </div>
  );
}
