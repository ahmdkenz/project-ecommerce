// src/pages/Product.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Product.css";

export default function Product() {
  const { products, loading } = useProducts();
  
  // State untuk filter
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(50000000);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
  // Dapatkan kategori unik dan merek dari data produk
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.filter(p => p?.category).map(p => p.category))];
  }, [products]);
  
  // Dapatkan merek dari data produk berdasarkan nama produk
  const brands = useMemo(() => {
    if (!products || !products.length) return [];
    const productBrands = products.map(p => {
      const name = p.title.toLowerCase();
      
      // Ekstrak merek dari nama produk
      if (name.includes("intel")) return "Intel";
      if (name.includes("nvidia") || name.includes("gtx") || name.includes("rtx")) return "NVIDIA";
      // Handle berbagai variasi penulisan SK Hynix
      if (name.includes("sk hynix") || name.includes("sk hyinix") || name.includes("skyhynix")) return "SK Hynix";
      if (name.includes("samsung")) return "Samsung";
      if (name.includes("kingston")) return "Kingston";
      return null;
    });
    
    return [...new Set(productBrands.filter(brand => brand !== null))];
  }, [products]);
  
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
      if (selectedBrands.length > 0) {
        const productName = product.title.toLowerCase();
        const hasSelectedBrand = selectedBrands.some(brand => {
          switch (brand) {
            case "SK Hynix":
              return productName.includes("sk hynix") || productName.includes("sk hyinix") || productName.includes("skyhynix");
            case "NVIDIA":
              return productName.includes("nvidia") || productName.includes("gtx") || productName.includes("rtx");
            default:
              return productName.includes(brand.toLowerCase());
          }
        });
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
    setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
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
    setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
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
                    onChange={(e) => {
                      setCurrentPage(1);
                      setPriceRange(parseInt(e.target.value));
                    }}
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
                onChange={(e) => {
                  setCurrentPage(1);
                  setSortOption(e.target.value);
                }}
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
                filteredProducts
                  .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                  .map(product => (
                    <ProductCard key={product.slug} product={product} />
                  ))
              )}
            </div>

            {/* Pagination controls */}
            {filteredProducts.length > 0 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  <FaChevronLeft />
                </button>
                <span className="pagination-info">
                  Halaman {currentPage} dari{' '}
                  {Math.ceil(filteredProducts.length / productsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => 
                    Math.min(Math.ceil(filteredProducts.length / productsPerPage), prev + 1)
                  )}
                  disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}
                  className="pagination-button"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}