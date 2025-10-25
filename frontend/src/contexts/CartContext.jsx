// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Notification from "../components/Notification";

const CartContext = createContext();

// Context untuk notifikasi
const NotificationContext = createContext();

// Fungsi untuk generate UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export function CartProvider({ children }) {
  // State untuk notifikasi
  const [notification, setNotification] = useState(null);

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
      const uniqueId = generateUUID();
      return [...prevCart, { ...product, quantity, uniqueId }];
    });
    // Tampilkan notifikasi sukses
    setNotification({
      message: `${product.title || product.name} (${quantity} item) berhasil ditambahkan ke keranjang!`,
      type: "success"
    });
  };

  // Menghapus item dari keranjang
  const removeFromCart = (uniqueId) => {
    const itemToRemove = cart.find(item => item.uniqueId === uniqueId);
    setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
    // Tampilkan notifikasi error (merah) untuk penghapusan
    if (itemToRemove) {
      setNotification({
        message: `${itemToRemove.title || itemToRemove.name} telah dihapus dari keranjang`,
        type: "error"
      });
    }
  };

  // Mengubah kuantitas item di keranjang
  const updateQuantity = (uniqueId, newQuantity) => {
    // Jika kuantitas 0 atau kurang, hapus dari keranjang
    if (newQuantity <= 0) {
      removeFromCart(uniqueId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.uniqueId === uniqueId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
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
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);