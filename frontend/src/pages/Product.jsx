// src/pages/Product.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext"; // jika gunakan context
import "./Product.css";

export default function Product() {
  const { products, loading } = useProducts(); // jika tidak pakai context, fetch langsung dalam useEffect

  if (loading) return <div className="container">Loading produk...</div>;

  return (
    <div className="product-page">
      <section className="page-header"><div className="container"><h1>Katalog Produk Kami</h1></div></section>

      <div className="container">
        <div className="product-page-layout">
          {/* sidebar tetap seperti sebelumnya (bisa dipotong untuk ringkas) */}

          <section className="product-grid-container">
            <div className="product-grid">
              {products.length === 0 ? (
                <p>Tidak ada produk.</p>
              ) : (
                products.map(p => (
                  <article className="product-card" key={p.slug}>
                    <div className="card-image">
                      <img src={p.image} alt={p.title || p.name} />
                      {p.badge && <span className="badge new-badge">{p.badge}</span>}
                    </div>

                    <div className="card-content">
                      <span className="card-category">{p.category}</span>
                      <h3>{p.title || p.name}</h3>
                      <p className="card-price">Rp {Number(p.price).toLocaleString("id-ID")}</p>
                    </div>

                    <div className="card-actions">
                      <Link to={`/product/${p.slug}`} className="btn btn-secondary">Lihat Detail</Link>
                      <button className="btn btn-primary" aria-label={`Tambah ${p.title || p.name}`}>
                        <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
