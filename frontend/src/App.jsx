// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* jika mau langsung tanpa Layout:
              <Route path="/" element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
