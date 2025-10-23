import React, { useState, useEffect } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [statusClass, setStatusClass] = useState("");
  
  // Validasi form
  useEffect(() => {
    const newErrors = {};
    
    if (touched.name && !form.name) {
      newErrors.name = "Nama tidak boleh kosong";
    }
    
    if (touched.email) {
      if (!form.email) {
        newErrors.email = "Email tidak boleh kosong";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Format email tidak valid";
      }
    }
    
    if (touched.subject && !form.subject) {
      newErrors.subject = "Subjek pesan tidak boleh kosong";
    }
    
    if (touched.message && !form.message) {
      newErrors.message = "Pesan tidak boleh kosong";
    } else if (touched.message && form.message.length < 10) {
      newErrors.message = "Pesan terlalu pendek (minimal 10 karakter)";
    }
    
    setErrors(newErrors);
  }, [form, touched]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  
  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }
  
  // Cek apakah form valid
  const isFormValid = () => {
    return (
      form.name.trim() !== '' && 
      form.email.trim() !== '' && 
      /\S+@\S+\.\S+/.test(form.email) &&
      form.subject.trim() !== '' && 
      form.message.trim() !== '' &&
      form.message.length >= 10
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validasi semua field dengan menandai semuanya sebagai touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });
    
    // Cek validasi form sebelum mengirim
    if (!isFormValid()) {
      setStatus("Form tidak valid. Silakan periksa kembali isian Anda.");
      setStatusClass("error");
      return;
    }
    
    // Reset status sebelum mengirim
    setStatus("Mengirim pesan Anda...");
    setStatusClass("loading");
    
    // Simulasi API call dengan timeout
    setTimeout(() => {
      setStatus("Pesan berhasil terkirim. Terima kasih!");
      setStatusClass("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
      
      // Hapus pesan sukses setelah beberapa detik
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }, 1500);
    
    // Dalam implementasi nyata, kode di bawah ini bisa digunakan:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setStatus("Pesan berhasil terkirim. Terima kasih!");
        setStatusClass("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Gagal mengirim pesan. Silakan coba lagi.");
        setStatusClass("error");
      }
    } catch (error) {
      setStatus("Terjadi kesalahan. Silakan coba lagi nanti.");
      setStatusClass("error");
    }
    */
  }

  // Effect untuk animasi saat komponen mount
  useEffect(() => {
    // Scroll ke atas halaman saat komponen dimuat
    window.scrollTo(0, 0);
    
    // Tambahkan class untuk animasi pada elemen-elemen
    const formContainer = document.querySelector('.contact-form-container');
    const infoContainer = document.querySelector('.contact-info-container');
    
    if (formContainer) formContainer.style.opacity = '0';
    if (infoContainer) infoContainer.style.opacity = '0';
    
    // Trigger animasi setelah komponen dimuat
    setTimeout(() => {
      if (formContainer) formContainer.style.opacity = '1';
      if (infoContainer) infoContainer.style.opacity = '1';
    }, 100);
  }, []);

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
                    className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact_email">Email Anda</label>
                  <input
                    type="email"
                    id="contact_email"
                    name="email"
                    className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.email && errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact_subject">Subjek Pesan</label>
                  <input
                    type="text"
                    id="contact_subject"
                    name="subject"
                    className={`form-input ${touched.subject && errors.subject ? 'error' : ''}`}
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.subject && errors.subject && (
                    <p className="error-message">{errors.subject}</p>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact_message">Pesan Anda</label>
                  <textarea
                    id="contact_message"
                    name="message"
                    className={`form-input ${touched.message && errors.message ? 'error' : ''}`}
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.message && errors.message && (
                    <p className="error-message">{errors.message}</p>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary contact-submit-btn"
                disabled={status === "Mengirim pesan Anda..." || !isFormValid()}
              >
                {status === "Mengirim pesan Anda..." ? (
                  <>
                    <i className="fas fa-spinner fa-spin" /> Mengirim...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" /> Kirim Pesan
                  </>
                )}
              </button>

              {status && <p className={`form-status ${statusClass}`}>{status}</p>}
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
