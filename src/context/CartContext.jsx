import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// --- CORREÇÃO: Salvar e Carregar o Carrinho no Navegador ---
// Função para carregar o carrinho do localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('microcheCart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Não foi possível carregar o carrinho:", error);
  }
  return []; // Retorna vazio se não houver nada ou der erro
};


export const CartProvider = ({ children }) => {

  // CORREÇÃO: Removemos os dados 'mock' e carregamos o que estava salvo
 const [cartItems, setCartItems] = useState(loadCartFromStorage());

  // Efeito para salvar o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    try {
      localStorage.setItem('microcheCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Não foi possível salvar o carrinho:", error);
    }
  }, [cartItems]); // Este 'hook' corre sempre que 'cartItems' muda


     const addToCart = useCallback((product, quantity = 1) => {
     setCartItems(prevItems => {
     const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Se já existe, atualiza a quantidade
      return prevItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      } else {
        // --- CORREÇÃO CRÍTICA ---
        // Criamos um item de carrinho LIMPO.
        // O carrinho não precisa de 'description', 'stock', 'rating', etc.
        // Guardamos 'mainImage' como 'image' para ser usado no carrinho.
     const newItem = { 
      id: product.id,
      name: product.name,
      price: parseFloat(product.price), // Garante que é um número
	  image: product.mainImage, // Pega a imagem principal
	  quantity: quantity 
 	};
        return [...prevItems, newItem];
 }
 });
 }, []); // Usamos 'useCallback' para otimizar

 const removeFromCart = useCallback((id) => {
 	setCartItems(prevItems => prevItems.filter(item => item.id !== id));
 }, []);

  // Função para ATUALIZAR a quantidade (ex: no CartPage)
  const updateQuantity = useCallback((id, newQuantity) => {
    const qty = Math.max(1, newQuantity); // Garante que a quantidade é pelo menos 1
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  }, []);

 const getTotalPrice = useCallback(() => {
 	return cartItems.reduce((total, item) => 
 	  // O preço já é um número (do 'products.js'), mas parseFloat não estraga
 	  total + (parseFloat(item.price) * (item.quantity || 1)), 0);
 }, [cartItems]);


 const contextValue = {
 	cartItems,
 	addToCart,
 	removeFromCart,
 	updateQuantity, // Adicionada esta função (útil para a página do carrinho)
 	getTotalPrice,
 };

 return (
 	<CartContext.Provider value={contextValue}>
 	  {children}
 	</CartContext.Provider>
 );
};