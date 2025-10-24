// src/pages/Product.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "./ProductCard";
import "./Product.css";

export default function Product() {
  const { products, loading } = useProducts();
  
  // State untuk filter
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(50000000);
  const [sortOption, setSortOption] = useState("newest");
  
  // Dapatkan kategori unik dan merek dari data produk
  const categories = useMemo(() => {
    if (!products || !products.length) return [];
    return [...new Set(products.map(p => p.category))];
  }, [products]);
  
  // Untuk merek, kita gunakan data yang ada (ini bisa diubah jika ada field merek di data produk)
  const brands = useMemo(() => {
    return ["CyberCore", "QuantumLeap", "NovaView"];
  }, []);
  
  // Fungsi untuk memfilter produk
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      // Filter berdasarkan kategori
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Filter berdasarkan harga
      if (product.price > priceRange) {
        return false;
      }
      
      // Filter berdasarkan merek (brand)
      // Asumsikan bahwa nama produk mengandung nama merek
      if (selectedBrands.length > 0) {
        const productName = (product.title || product.name || "").toLowerCase();
        const hasSelectedBrand = selectedBrands.some(brand => 
          productName.includes(brand.toLowerCase())
        );
        if (!hasSelectedBrand) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Pengurutan
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return (a.title || a.name).localeCompare(b.title || b.name);
        case "newest":
        default:
          // Asumsikan item terbaru pertama
          return 0;
      }
    });
  }, [products, selectedCategories, selectedBrands, priceRange, sortOption]);
  
  // Handler untuk checkbox kategori
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Handler untuk checkbox merek
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  // Format harga untuk ditampilkan pada slider
  const formatPriceLabel = () => {
    return `Rp 0 - Rp ${Number(priceRange).toLocaleString("id-ID")}`;
  };

  if (loading) return <div className="container">Loading produk...</div>;

  return (
    <div className="product-page">
      <section className="page-header">
        <div className="container">
          <h1>Katalog Produk Kami</h1>
          <p>Temukan teknologi yang Anda butuhkan.</p>
        </div>
      </section>

      <div className="container">
        <div className="product-page-layout">
          {/* Sidebar Filter */}
          <aside className="sidebar-filters">
            <details className="filter-details" open>
              <summary className="filter-summary">
                <h3><i className="fas fa-filter"></i> Filter Produk</h3>
                <i className="fas fa-chevron-down expand-icon"></i>
              </summary>
              
              <div className="filter-content">
                <div className="filter-group">
                  <h4>Kategori</h4>
                  <ul className="filter-list">
                    {categories.map((category) => (
                      <li key={category}>
                        <label>
                          <input 
                            type="checkbox" 
                            name="category" 
                            value={category} 
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          /> 
                          {category}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-group">
                  <h4>Rentang Harga</h4>
                  <label htmlFor="price-range" className="price-label">{formatPriceLabel()}</label>
                  <input 
                    type="range" 
                    id="price-range" 
                    className="price-slider" 
                    min="0" 
                    max="50000000" 
                    step="100000" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  />
                </div>

                <div className="filter-group">
                  <h4>Merek</h4>
                  <ul className="filter-list">
                    {brands.map((brand) => (
                      <li key={brand}>
                        <label>
                          <input 
                            type="checkbox" 
                            name="brand" 
                            value={brand} 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                          /> 
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </aside>

          <section className="product-grid-container">
            <div className="sort-bar">
              <label htmlFor="sort-by">Urutkan:</label>
              <select 
                id="sort-by" 
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="name-asc">Nama (A-Z)</option>
              </select>
            </div>
            
            <div className="product-grid">
              {filteredProducts.length === 0 ? (
                <p>Tidak ada produk yang sesuai dengan filter.</p>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.slug} product={product} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}