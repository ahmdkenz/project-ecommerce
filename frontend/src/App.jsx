import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import halaman lain ketika siap: Products, About, Contact

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Contoh route lain:
             <Route path="products" element={<Products />} />
             <Route path="about" element={<About />} />
             <Route path="contact" element={<Contact />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
s