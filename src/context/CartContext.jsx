import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState([
    {
        id: '101',
        name: 'Amigurumi de Sereia',
        price: 85.00, // Preço como número
        quantity: 2,
        imageUrl: 'https://placehold.co/80x80/EDE7F6/9575CD?text=Sereia'
    },
    {
        id: '102',
        name: 'Naninha de Urso',
        price: 45.00, // Preço como número
        quantity: 1,
        imageUrl: 'https://placehold.co/80x80/EDE7F6/9575CD?text=Urso'
    }
  ]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Garantimos que o preço é um número quando adicionado
        return [...prevItems, { 
          ...product, 
          price: parseFloat(product.price), 
          quantity: quantity 
        }];
      }
    });
  };

  const removeFromCart = useCallback((id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const getTotalPrice = useCallback(() => {
    // Usamos parseFloat() aqui também para garantir que a soma funciona
    return cartItems.reduce((total, item) => 
        total + (parseFloat(item.price) * (item.quantity || 1)), 0);
  }, [cartItems]);


  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};