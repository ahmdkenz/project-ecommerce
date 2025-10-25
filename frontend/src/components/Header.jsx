import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { getCartCount } = useCart();
  const cartItemCount = getCartCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">MUSTIKA KOMPUTER</Link>
        </div>

        {/* Burger Menu Button */}
        <div 
          className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMobileMenu();
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>

        {/* Navigation Menu */}
        <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/product" className={({isActive}) => isActive ? 'active' : ''}>Produk</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>Tentang Kami</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Kontak</NavLink></li>
            <li>
              <NavLink to="/cart" className={({isActive}) => isActive ? 'active' : ''} style={{ position: 'relative' }}>
                <i className="fas fa-shopping-cart"></i> Keranjang
                {cartItemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    background: 'var(--color-accent)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
