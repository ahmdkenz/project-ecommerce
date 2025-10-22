import React from "react";
import "./About.css"; // pastikan file ada di src/pages/About.css

export default function About() {
  return (
    <div className="about-page">
      <section className="page-header">
        <div className="container">
          <h1>Tentang Mustika Komputer</h1>
          <p>Mendorong Inovasi Teknologi untuk Masa Depan Anda.</p>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="container about-intro-layout">
          <div className="about-intro-content">
            <h2 className="section-title">Misi Kami</h2>
            <p>
              Di Mustika Komputer, kami berdedikasi untuk menyediakan akses ke teknologi komputer terkini dan tercanggih.
              Kami percaya bahwa teknologi adalah kunci untuk membuka potensi tak terbatas, baik untuk individu maupun bisnis.
            </p>
            <p>
              Kami berkomitmen untuk memberikan produk berkualitas tinggi, layanan pelanggan yang luar biasa,
              dan pengalaman belanja yang mulus dan modern.
            </p>
            <a href="/products" className="btn btn-primary">Lihat Produk Kami</a>
          </div>

          <div className="about-intro-image">
            <img
              src="https://placehold.co/600x400/007BFF/FFFFFF?text=Inovasi+di+MK"
              alt="Inovasi di Mustika Komputer"
            />
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nilai-Nilai Kami</h2>
          <div className="feature-grid about-feature-grid">
            <div className="feature-item" style={{ animationDelay: "0.1s" }}>
              <i className="fas fa-lightbulb"></i>
              <h3>Inovasi</h3>
              <p>Selalu mencari dan menawarkan teknologi terbaru.</p>
            </div>

            <div className="feature-item" style={{ animationDelay: "0.2s" }}>
              <i className="fas fa-shield-alt"></i>
              <h3>Integritas</h3>
              <p>Berbisnis dengan jujur dan transparan.</p>
            </div>

            <div className="feature-item" style={{ animationDelay: "0.3s" }}>
              <i className="fas fa-users"></i>
              <h3>Pelanggan Utama</h3>
              <p>Kepuasan Anda adalah prioritas nomor satu kami.</p>
            </div>

            <div className="feature-item" style={{ animationDelay: "0.4s" }}>
              <i className="fas fa-award"></i>
              <h3>Kualitas</h3>
              <p>Hanya menyediakan produk terbaik dan terpercaya.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
