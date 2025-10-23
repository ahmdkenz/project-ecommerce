// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchProductsIndex, fetchProductMarkdown } from "../utils/productsApi";
import { useCart } from "../contexts/CartContext";
import "./ProductDetail.css"; // buat styling sesuai

export default function ProductDetail() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);   // metadata from products.json + frontmatter
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [quantity, setQuantity] = useState(1);
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

  if (loading) return <div className="container">Loading...</div>;
  if (meta === null) return <div className="container">Produk tidak ditemukan.</div>;

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
                <img src={meta.image} alt={meta.title || meta.name} />
                {meta.badge && <span className="badge new-badge">{meta.badge}</span>}
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
                <button 
                  className="btn btn-primary btn-add-to-cart"
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
              </div>

              <div className="buy-actions" style={{ marginTop: "1rem", display: 'flex', gap: '1rem' }}>
                <a
                  className="btn btn-accent"
                  style={{ flex: '1' }}
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya ingin pesan: ${meta.title || meta.name} - Rp ${Number(meta.price).toLocaleString('id-ID')}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Pesan via WhatsApp
                </a>
                <button
                  className="btn btn-secondary"
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
                    navigate('/cart');
                  }}
                  disabled={parseInt(meta.stock) <= 0}
                >
                  <i className="fas fa-shopping-bag"></i> Beli Sekarang
                </button>
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
            </div>

            <div className="tab-content-container">
              <div 
                id="deskripsi" 
                className="tab-content" 
                style={{display: activeTab === "deskripsi" ? "block" : "none"}}
              >
                <div className="product-markdown">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>

              <div 
                id="spesifikasi" 
                className="tab-content" 
                style={{display: activeTab === "spesifikasi" ? "block" : "none"}}
              >
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
                    {/* Tambahkan data spesifikasi lainnya dari frontmatter jika tersedia */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
