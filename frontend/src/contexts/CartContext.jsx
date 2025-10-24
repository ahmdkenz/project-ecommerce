// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Mengambil data cart dari localStorage jika ada
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Menyimpan cart ke localStorage saat cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Menambahkan item ke keranjang
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Cek apakah produk sudah ada di keranjang
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Jika produk sudah ada, update kuantitas
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Jika produk belum ada, tambahkan ke keranjang
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Menghapus item dari keranjang
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Mengubah kuantitas item di keranjang
  const updateQuantity = (productId, newQuantity) => {
    // Jika kuantitas 0 atau kurang, hapus dari keranjang
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Menghitung total item di keranjang
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Menghitung subtotal belanja
  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      // Handle both string and number price formats
      const price = typeof item.price === 'string' 
        ? parseInt(item.price.replace(/[^\d]/g, ""))
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Format angka ke format Rupiah
  const formatRupiah = (number) => {
    return `Rp ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  // Menghapus semua item dari keranjang
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartCount,
      getSubtotal,
      formatRupiah,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);