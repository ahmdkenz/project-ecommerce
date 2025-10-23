import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { getCartCount } = useCart();
  const cartItemCount = getCartCount();
  
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">MUSTIKA KOMPUTER</Link>
        </div>

        <nav className="main-nav">
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
