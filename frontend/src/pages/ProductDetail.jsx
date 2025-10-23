// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchProductsIndex, fetchProductMarkdown } from "../utils/productsApi";
import "./ProductDetail.css"; // buat styling sesuai

export default function ProductDetail() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);   // metadata from products.json + frontmatter
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="container">Loading...</div>;
  if (meta === null) return <div className="container">Produk tidak ditemukan.</div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav><Link to="/products">← Kembali ke katalog</Link></nav>

        <div className="detail-grid">
          <div className="detail-image">
            <img src={meta.image} alt={meta.title || meta.name} />
            {meta.badge && <span className="badge new-badge">{meta.badge}</span>}
          </div>

          <div className="detail-info">
            <h1>{meta.title || meta.name}</h1>
            <p className="detail-price">Rp {Number(meta.price || 0).toLocaleString("id-ID")}</p>
            <p><strong>Kategori:</strong> {meta.category}</p>
            {meta.stock !== undefined && <p><strong>Stok:</strong> {meta.stock}</p>}

            <div className="buy-actions">
              <button className="btn btn-primary">Tambah ke Keranjang</button>
              <a
                className="btn btn-accent"
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya ingin pesan: ${meta.title || meta.name} - Rp ${Number(meta.price).toLocaleString('id-ID')}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Pesan via WhatsApp
              </a>
            </div>

            <hr />

            <div className="product-markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
