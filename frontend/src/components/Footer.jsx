import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} MUSTIKA KOMPUTER. Hak Cipta Dilindungi.</p>
        <div className="social-links">
          <a href="#" aria-label="facebook"><i className="icon-facebook" /></a>
          <a href="#" aria-label="instagram"><i className="icon-instagram" /></a>
          <a href="#" aria-label="twitter"><i className="icon-twitter" /></a>
        </div>
      </div>
    </footer>
  );
}
