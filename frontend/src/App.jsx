// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ProductsProvider } from "./contexts/ProductsContext";

export default function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            {/* Tambahan rute untuk kompatibilitas URL lama */}
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}
