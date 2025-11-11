import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Crio o "cérebro" do carrinho, vazio por enquanto
const CartContext = createContext();

// Crio o "hook" (useCart) que os componentes vão usar
// para aceder facilmente ao cérebro
export const useCart = () => useContext(CartContext);

// --- Salvar e Carregar o Carrinho no Navegador ---
// Esta é uma função "ajudante" que só corre uma vez
// Função para carregar o carrinho do localStorage
const loadCartFromStorage = () => {
 try {
    // decidi chamar o meu item guardado de 'microcheCart'
 const storedCart = localStorage.getItem('microcheCart');
 if (storedCart) {
      // Se encontrei algo, tenho de o "des-transformar" de string para um array
  return JSON.parse(storedCart);
}
 } catch (error) {
 console.error("Não foi possível carregar o carrinho:", error);
 }
 return []; // Retorna vazio se não houver nada ou der erro
};


// Este é o "Fornecedor", o componente que vai guardar toda a lógica
// e "abraçar" a minha aplicação
export const CartProvider = ({ children }) => {

 // O estado principal: um array com os itens do carrinho
  // Em vez de começar com [], eu chamo a função que busca no localStorage
const [cartItems, setCartItems] = useState(loadCartFromStorage());

 // --- EFEITO DE PERSISTÊNCIA ---
 // Efeito para salvar o carrinho no localStorage sempre que ele mudar
 useEffect(() => {
    // Este 'try/catch' é segurança, caso o localStorage falhe
 try {
      // Eu "transformo" o meu array de itens numa string para poder guardar
 localStorage.setItem('microcheCart', JSON.stringify(cartItems));
 } catch (error) {
 console.error("Não foi possível salvar o carrinho:", error);
 }
 }, [cartItems]); // Este 'hook' corre sempre que 'cartItems' muda


    // --- FUNÇÕES DO CARRINHO ---

    // Função para ADICIONAR um produto
    // 'useCallback' é uma otimização, para esta função não ser recriada a toda a hora
const addToCart = useCallback((product, quantity = 1) => {
      // Eu uso 'setCartItems' com uma função para garantir que pego o estado mais recente
setCartItems(prevItems => {
      // 1. Verifico se o item já existe
const existingItem = prevItems.find(item => item.id === product.id);

 if (existingItem) {
 // 2a. Se já existe, atualiza a quantidade
        // Eu mapeio o array e só mudo o item que tem o ID igual
 return prevItems.map(item =>
 item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
 );
 } else {
 // 2b. Se é novo, crio o item
 
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
        // E adiciono o item novo ao fim do array
 return [...prevItems, newItem];
}
});
}, []); // O '[]' no 'useCallback' diz que esta função nunca muda

  // Função para REMOVER um item (pelo ID)
const removeFromCart = useCallback((id) => {
    // Eu filtro o array e mantenho todos os itens MENOS o que tem este ID
 setCartItems(prevItems => prevItems.filter(item => item.id !== id));
}, []);

 // Função para ATUALIZAR a quantidade (ex: no CartPage)
 const updateQuantity = useCallback((id, newQuantity) => {
 const qty = Math.max(1, newQuantity); // Garante que a quantidade é pelo menos 1
 setCartItems(prevItems => 
      // Mapeio o array e mudo a quantidade do item com este ID
 prevItems.map(item => 
 item.id === id ? { ...item, quantity: qty } : item
 )
 );
 }, []);

  // Função para CALCULAR o preço total
const getTotalPrice = useCallback(() => {
    // 'reduce' é a forma moderna de fazer um loop 'for' para somar coisas
 return cartItems.reduce((total, item) => 
 // O preço já é um número (do 'products.js'), mas parseFloat não estraga
 total + (parseFloat(item.price) * (item.quantity || 1)), 0); // 0 é o valor inicial
}, [cartItems]); // Esta função SÓ é recriada se 'cartItems' mudar


  // --- O VALOR FINAL ---
  // Este é o objeto que todos os meus componentes
  // vão receber quando usarem 'useCart()'
const contextValue = {
 cartItems,
 addToCart,
 removeFromCart,
 updateQuantity, // Adicionada esta função (útil para a página do carrinho)
 getTotalPrice,
};

  // Eu "forneço" o 'contextValue' para todos os 'children' (o resto da app)
return (
 <CartContext.Provider value={contextValue}>
 {children}
 </CartContext.Provider>
);
};



/*
==
==    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)
==

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// Precisamos do cérebro de Autenticação para saber se o utilizador está logado
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// --- FUNÇÕES HELPER ---

// API_URL: Colocar a URL base do  backend aqui
// (Ex: 'http://localhost:5000/api')
const API_URL = '/api/cart'; // Usando URL relativa (ex: /api/cart/add)

// Função para carregar o carrinho do localStorage (PARA CONVIDADOS)
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('microcheCart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Não foi possível carregar o carrinho local:", error);
  }
  return []; 
};

// --- O FORNECEDOR REAL ---

export const CartProvider = ({ children }) => {
  // --- ESTADO ---
  const [cartItems, setCartItems] = useState([]);
  // 'isLoading' é crucial para a UX. Mostra um spinner enquanto
  // o carrinho está a ser buscado ou fundido (merged).
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DEPENDÊNCIA DE AUTENTICAÇÃO ---
  // Vigiamos o 'isAuthenticated' e 'isAuthLoading'
  // O 'userToken' (ou como o chamar) é essencial para as chamadas de API
  const { isAuthenticated, isAuthLoading, userToken } = useAuth(); // Assumindo que o AuthContext fornece o userToken

  // --- LÓGICA DE CARREGAMENTO INICIAL E "MERGE" (FUSÃO) ---
  useEffect(() => {
    // Não fazemos nada até a autenticação estar resolvida
    if (isAuthLoading) {
      return; 
    }

    const loadAndMergeCart = async () => {
      setIsLoading(true);
      setError(null);
      const localCart = loadCartFromStorage();

      if (isAuthenticated) {
        // Se o utilizador está logado...
        try {
          let finalCart = [];
          if (localCart.length > 0) {
            // Se ele tem um carrinho local E está logado, temos de fazer "MERGE"
            // REQUERIMENTO BACKEND: Rota que recebe um carrinho local e o funde
            // com o carrinho da conta, devolvendo o carrinho final.
            const res = await fetch(`${API_URL}/merge`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
              },
              body: JSON.stringify({ localCartItems: localCart })
            });
            if (!res.ok) throw new Error('Falha ao fundir carrinhos');
            finalCart = await res.json();
            
            // Limpa o carrinho local pois já está na base de dados
            localStorage.removeItem('microcheCart');

          } else {
            // Se está logado e NÃO tem carrinho local, apenas busca o da API
            // REQUERIMENTO BACKEND: Rota que devolve o carrinho do utilizador
            const res = await fetch(API_URL, {
              headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (!res.ok) throw new Error('Falha ao buscar carrinho da API');
            finalCart = await res.json();
          }
          setCartItems(finalCart);
        } catch (err) {
          setError(err.message);
          console.error(err);
        }

      } else {
        // Se NÃO está logado, apenas carrega o carrinho local
        setCartItems(localCart);
      }
      setIsLoading(false);
    };

    loadAndMergeCart();
    
    // Este efeito complexo corre sempre que o estado de login muda
  }, [isAuthenticated, isAuthLoading, userToken]);


  // --- LÓGICA DE SALVAR NO LOCALSTORAGE (SÓ PARA CONVIDADOS) ---
  useEffect(() => {
    // Se o utilizador NÃO está logado E não estamos a carregar,
    // guardamos as mudanças do carrinho no localStorage.
    if (!isAuthenticated && !isLoading) {
      try {
        localStorage.setItem('microcheCart', JSON.stringify(cartItems));
      } catch (error) {
        console.error("Não foi possível salvar o carrinho local:", error);
      }
    }
  }, [cartItems, isAuthenticated, isLoading]);


  // --- FUNÇÕES PÚBLICAS (HÍBRIDAS) ---

  const addToCart = useCallback(async (product, quantity = 1) => {
    setError(null);

    if (isAuthenticated) {
      // LOGADO: Chama a API
      try {
        // REQUERIMENTO BACKEND: Rota para adicionar um item
        const res = await fetch(`${API_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({ productId: product.id, quantity: quantity })
        });
        if (!res.ok) throw new Error('Falha ao adicionar ao carrinho na API');
        const updatedCart = await res.json();
        setCartItems(updatedCart); // Atualiza o estado com a resposta da API
      } catch (err) {
        setError(err.message);
      }
    } else {
      // CONVIDADO: Lógica do localStorage (a lógica "antiga")
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          const newItem = { 
             id: product.id,
             name: product.name,
             price: parseFloat(product.price),
             image: product.mainImage,
             quantity: quantity 
           };
          return [...prevItems, newItem];
        }
      });
    }
  }, [isAuthenticated, userToken]);

  
  const removeFromCart = useCallback(async (id) => {
    setError(null);
    if (isAuthenticated) {
      // LOGADO: Chama a API
      try {
        // REQUERIMENTO BACKEND: Rota para remover um item
        const res = await fetch(`${API_URL}/remove/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${userToken}` }
        });
        if (!res.ok) throw new Error('Falha ao remover item na API');
        const updatedCart = await res.json();
        setCartItems(updatedCart);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // CONVIDADO: Lógica do localStorage
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  }, [isAuthenticated, userToken]);

  
  const updateQuantity = useCallback(async (id, newQuantity) => {
    const qty = Math.max(1, newQuantity);
    setError(null);
    
    if (isAuthenticated) {
      // LOGADO: Chama a API
      try {
        // REQUERIMENTO BACKEND: Rota para atualizar quantidade
        const res = await fetch(`${API_URL}/update`, {
          method: 'PUT', // ou 'PATCH'
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${userToken}'
          },
          body: JSON.stringify({ itemId: id, newQuantity: qty })
        });
        if (!res.ok) throw new Error('Falha ao atualizar quantidade na API');
        const updatedCart = await res.json();
        setCartItems(updatedCart);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // CONVIDADO: Lógica do localStorage
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  }, [isAuthenticated, userToken]);

  // Esta função não precisa de API, calcula com base no estado 'cartItems'
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => 
      total + (parseFloat(item.price) * (item.quantity || 1)), 0);
  }, [cartItems]);


  const contextValue = {
    cartItems,
    isLoading, // <-- Agora é um estado real
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

*/