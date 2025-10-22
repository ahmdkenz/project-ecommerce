// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* jika mau langsung tanpa Layout:
              <Route path="/" element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
