// src/main.jsx
import React from "react";
import { ProductsProvider } from "./contexts/ProductsContext";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"; // atau ./styles.css sesuai file-mu

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
