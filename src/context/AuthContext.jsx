import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Cria o Contexto (o "cérebro" vazio)
const AuthContext = createContext();

// 2. Cria o "Hook" (a forma fácil de usar o cérebro)
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Cria o "Fornecedor" (o componente que segura a lógica)
export function AuthProvider({ children }) {

  // ESTADO INICIAL: Deve ser 'false' para forçar o login 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Essa é a função que a LoginPage vai chamar
  const login = () => {
    
    console.log('Login FALSO executado! Utilizador está autenticado.');
    setIsAuthenticated(true);
    
    // E, depois do login, mandamos o utilizador para a Home
    navigate('/'); 
  };

  // Essa é a função que o Navbar vai chamar
  const logout = () => {
    console.log('Logout executado! Utilizador saiu.');
    setIsAuthenticated(false);
    navigate('/');
  };

  // O valor que o "cérebro" vai fornecer para todo o site
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  );
}