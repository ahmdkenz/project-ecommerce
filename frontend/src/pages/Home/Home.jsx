import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Masa Depan Teknologi Ada di Genggaman Anda</h1>
            <p>
              Temukan inovasi terbaru dalam komputasi dan perangkat cerdas hanya
              di Mustika Komputer.
            </p>
            <Link to="product" className="btn btn-accent">
              Jelajahi Produk Terbaru
            </Link>
          </div>

          {/* === BAGIAN YANG DIUPDATE === */}
          <div className="hero-animation">
            <img
              src="/images/Logo (2).png" // <-- Ganti nama file ini jika perlu
              alt="Logo Mustika Komputer"
              className="animated-logo"
            />
          </div>
          {/* ========================== */}
          
        </div>

        <div className="hero-bg-overlay" />
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Mengapa Memilih Kami?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <i className="icon-processor" /> <h3>Teknologi Terdepan</h3>
              <p>
                Produk pilihan dengan spesifikasi tercanggih untuk kebutuhan
                Anda.
              </p>
            </div>
            <div className="feature-item">
              <i className="icon-delivery" /> <h3>Pengiriman Cepat</h3>
              <p>Produk Anda akan tiba dengan aman dan tepat waktu.</p>
            </div>
            <div className="feature-item">
              <i className="icon-support" /> <h3>Dukungan Prima</h3>
              <p>Tim ahli kami siap membantu Anda kapan saja.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Siap Merasakan Inovasi?</h2>
          <p>
            Daftar sekarang dan dapatkan penawaran eksklusif untuk
            produk-produk pilihan.
          </p>
        </div>
      </section>
    </div>
  );
}