// src/contexts/ProductsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProductsIndex } from "../utils/productsApi";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchProductsIndex()
      .then(list => mounted && setProducts(list))
      .catch(err => { console.error(err); if (mounted) setProducts([]); })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
