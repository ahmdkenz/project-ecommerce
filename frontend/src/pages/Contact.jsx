import React, { useState } from "react";
import "./Contact.css"; // pastikan file ini ada di src/pages/Contact.css

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Untuk prototyping: tampilkan pesan sukses
    // Di produksi: kirim ke backend/email service atau hubungkan ke WhatsApp API
    setStatus("Mengirim...");
    setTimeout(() => {
      setStatus("Pesan terkirim. Terima kasih!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  }

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Hubungi Tim Kami</h1>
          <p>Ada pertanyaan atau butuh bantuan? Kami siap membantu!</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-layout">

          {/* Form */}
          <div className="contact-form-container">
            <h2 className="contact-subtitle">Kirim Pesan Langsung</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact_name">Nama Anda</label>
                  <input
                    type="text"
                    id="contact_name"
                    name="name"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_email">Email Anda</label>
                  <input
                    type="email"
                    id="contact_email"
                    name="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact_subject">Subjek Pesan</label>
                  <input
                    type="text"
                    id="contact_subject"
                    name="subject"
                    className="form-input"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact_message">Pesan Anda</label>
                  <textarea
                    id="contact_message"
                    name="message"
                    className="form-input"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary contact-submit-btn">
                <i className="fas fa-paper-plane" /> Kirim Pesan
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          </div>

          {/* Info Kontak */}
          <div className="contact-info-container">
            <h2 className="contact-subtitle">Informasi Kontak</h2>

            <ul className="contact-details-list">
              <li>
                <i className="fas fa-map-marker-alt contact-icon" />
                <div>
                  <strong>Alamat Kantor:</strong><br />
                  Gedung Cyber Future Lt. 20<br />
                  Jl. Teknologi Raya No. 1<br />
                  Jakarta Selatan, 12345
                </div>
              </li>

              <li>
                <i className="fas fa-phone-alt contact-icon" />
                <div>
                  <strong>Telepon:</strong><br />
                  (021) 555-1234
                </div>
              </li>

              <li>
                <i className="fas fa-envelope contact-icon" />
                <div>
                  <strong>Email:</strong><br />
                  support@mustikakomputer.com
                </div>
              </li>

              <li>
                <i className="fas fa-clock contact-icon" />
                <div>
                  <strong>Jam Operasional:</strong><br />
                  Senin - Jumat: 09:00 - 17:00 WIB<br />
                  Sabtu: 10:00 - 14:00 WIB
                </div>
              </li>
            </ul>

            <div className="map-container">
              <iframe
                title="Lokasi Mustika Komputer"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.010191799632!2d106.8016913147696!3d-6.262590995466878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f16f3afc1341%3A0x285973c683515053!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1678886543210!5m2!1sen!2sid"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
