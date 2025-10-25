// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchProductsIndex, fetchProductMarkdown } from "../../utils/productsApi";
import { useCart } from "../../contexts/CartContext";
import "../../utils/buffer-polyfill"; // Tambahkan polyfill untuk Buffer
import "./ProductDetail.css"; // buat styling sesuai

export default function ProductDetail() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);   // metadata from products.json + frontmatter
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        // 1) fetch index, find file name by slug
        const index = await fetchProductsIndex();
        const entry = index.find(i => i.slug === slug);
        if (!entry) {
          if (mounted) setMeta(null);
          return;
        }
        // set basic meta from index first
        if (mounted) setMeta(entry);

        // 2) fetch the markdown file and parse frontmatter + content
        const md = await fetchProductMarkdown(entry.file);
        // merge frontmatter (md.frontmatter) with index entry (index has title/price etc.)
        const merged = { ...entry, ...md.frontmatter };
        if (mounted) {
          setMeta(merged);
          setContent(md.content);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [slug]);

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Memuat detail produk...</p>
    </div>
  );
  
  if (meta === null) return (
    <div className="error-container">
      <i className="fas fa-exclamation-circle"></i>
      <h2>Produk tidak ditemukan</h2>
      <p>Maaf, produk yang Anda cari tidak tersedia.</p>
      <Link to="/products" className="btn btn-primary">
        Kembali ke Katalog
      </Link>
    </div>
  );

  return (
    <div className="product-detail-page">
      <section className="page-header">
        <div className="container">
          <h1>Detail Produk</h1>
        </div>
      </section>

      <div className="product-detail-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/products">← Kembali ke katalog</Link>
          </nav>

          <div className="product-detail-layout">
            {/* Galeri Produk */}
            <div className="product-gallery">
              <div className="main-image-container">
                <img 
                  src={`/images/${meta.slug}.png`}
                  alt={meta.title || meta.name || "Product Image"}
                  className="product-main-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
                {meta.badge && <span className="badge new-badge">{meta.badge}</span>}
                <div className="image-controls">
                  <button 
                    className="zoom-btn" 
                    onClick={() => window.open(`/images/${meta.slug}.png`, '_blank')}
                    title="Lihat gambar lebih besar"
                  >
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Info Produk */}
            <div className="product-info">
              <span className="product-meta-category">{meta.category}</span>
              <h1>{meta.title || meta.name}</h1>
              <div className="product-meta-price">
                Rp {Number(meta.price || 0).toLocaleString("id-ID")}
              </div>
              
              {meta.stock !== undefined && (
                <div className={`product-meta-stock ${parseInt(meta.stock) > 0 ? "in-stock" : "out-of-stock"}`}>
                  <i className={parseInt(meta.stock) > 0 ? "fas fa-check-circle" : "fas fa-times-circle"}></i>
                  {parseInt(meta.stock) > 0 ? `Tersedia (${meta.stock})` : "Stok Habis"}
                </div>
              )}

              <div className="product-actions">
                <div className="quantity-selector">
                  <button className="btn-qty" onClick={decrementQuantity}>-</button>
                  <input 
                    type="number" 
                    className="qty-input" 
                    value={quantity} 
                    onChange={e => setQuantity(parseInt(e.target.value) || 1)} 
                    min="1"
                  />
                  <button className="btn-qty" onClick={incrementQuantity}>+</button>
                </div>
                
              </div>

              <div className="buy-actions" style={{ marginTop: "1rem", display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn btn-primary"
                  style={{ flex: '1' }}
                  onClick={() => {
                    const product = {
                      id: slug,
                      name: meta.title || meta.name,
                      price: `Rp ${Number(meta.price || 0).toLocaleString("id-ID")}`,
                      image: meta.image,
                      category: meta.category
                    };
                    addToCart(product, quantity);
                    alert(`${quantity} ${meta.title || meta.name} telah ditambahkan ke keranjang`);
                  }}
                  disabled={parseInt(meta.stock) <= 0}
                >
                  <i className="fas fa-shopping-cart"></i> Tambah ke Keranjang
                </button>
                <a
                  className="btn btn-accent"
                  style={{ flex: '1' }}
                  href={`https://wa.me/6285136454580?text=${encodeURIComponent(`Halo, saya ingin pesan: ${meta.title || meta.name} - Rp ${Number(meta.price).toLocaleString('id-ID')}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Pesan via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Tab Section */}
          <div className="product-tabs-section">
            <div className="tab-navigation">
              <button 
                className={`tab-link ${activeTab === "deskripsi" ? "active" : ""}`}
                onClick={() => setActiveTab("deskripsi")}
              >
                Deskripsi
              </button>
              <button 
                className={`tab-link ${activeTab === "spesifikasi" ? "active" : ""}`}
                onClick={() => setActiveTab("spesifikasi")}
              >
                Spesifikasi
              </button>
              <button 
                className={`tab-link ${activeTab === "ulasan" ? "active" : ""}`}
                onClick={() => setActiveTab("ulasan")}
              >
                Ulasan {reviews.length > 0 ? `(${reviews.length})` : ''}
              </button>
            </div>

            <div className="tab-content-container">
              <div 
                id="deskripsi" 
                className="tab-content" 
                style={{display: activeTab === "deskripsi" ? "block" : "none"}}
              >
                <h3>Deskripsi Lengkap</h3>
                <div className="product-markdown">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>

              <div 
                id="spesifikasi" 
                className="tab-content" 
                style={{display: activeTab === "spesifikasi" ? "block" : "none"}}
              >
                <h3>Spesifikasi Teknis</h3>
                <table className="specs-table">
                  <tbody>
                    {meta.category && (
                      <tr>
                        <th>Kategori</th>
                        <td>{meta.category}</td>
                      </tr>
                    )}
                    {meta.stock !== undefined && (
                      <tr>
                        <th>Stok</th>
                        <td>{meta.stock}</td>
                      </tr>
                    )}
                    
                    {/* Ekstrak spesifikasi dari markdown content */}
                    {content && content.includes('## Spesifikasi Utama') && 
                      content
                        .split('## Spesifikasi Utama')[1]
                        .split(/^(?=##)/m)[0]
                        .trim()
                        .split('\n')
                        .filter(line => line.startsWith('- '))
                        .map((spec, index) => {
                          // Handle berbagai format penulisan spesifikasi
                          if (spec.includes(': ')) {
                            const [key, value] = spec.substring(2).split(': ');
                            return key && value ? (
                              <tr key={index}>
                                <th>{key}</th>
                                <td>{value}</td>
                              </tr>
                            ) : null;
                          } else {
                            // Format alternatif tanpa tanda titik dua
                            const content = spec.substring(2).trim();
                            // Coba ekstrak key dan value dari format lain
                            const parts = content.split(/ +/);
                            if (parts.length >= 2) {
                              const key = parts[0];
                              const value = parts.slice(1).join(' ');
                              return (
                                <tr key={index}>
                                  <th>{key}</th>
                                  <td>{value}</td>
                                </tr>
                              );
                            }
                            return null;
                          }
                        })
                    }
                  </tbody>
                </table>
              </div>

              <div 
                id="ulasan" 
                className="tab-content" 
                style={{display: activeTab === "ulasan" ? "block" : "none"}}
              >
                <h3>Ulasan Pelanggan</h3>
                {reviews.length > 0 ? (
                  <div className="reviews-list">
                    {reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <span className="review-author">{review.author}</span>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i}
                                className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                              ></i>
                            ))}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-content">
                          {review.comment}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-reviews">
                    <p>Belum ada ulasan untuk produk ini. Jadilah yang pertama!</p>
                    <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                      Tulis Ulasan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}