import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
