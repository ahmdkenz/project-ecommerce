import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { getCartCount } = useCart();
  const cartItemCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.main-nav') && !event.target.closest('.burger-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" />
            <span className="logo-text">MUSTIKA KOMPUTER</span>
          </Link>
        </div>

        <button 
          className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <NavLink 
                to="/" 
                end 
                className={({isActive}) => isActive ? 'active' : ''} 
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/product" 
                className={({isActive}) => isActive ? 'active' : ''} 
                onClick={() => setIsMenuOpen(false)}
              >
                
                <span>Produk</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => isActive ? 'active' : ''} 
                onClick={() => setIsMenuOpen(false)}
              >
              
                <span>Tentang Kami</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => isActive ? 'active' : ''} 
                onClick={() => setIsMenuOpen(false)}
              >
                
                <span>Kontak</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/cart" 
                className={({isActive}) => isActive ? 'active' : ''} 
                onClick={() => setIsMenuOpen(false)}
                style={{ position: 'relative' }}
              >
               
                <span>Keranjang</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">
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
