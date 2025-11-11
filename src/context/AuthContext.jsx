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

 // ESTADO INICIAL: Começa como 'false'
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const navigate = useNavigate();

 // Essa é a função que a LoginPage vai chamar
 const login = (email, password) => {
 
   // LÓGICA FALSA: Apenas finge que o login deu certo.
  // Não importa o email ou password, apenas autentica.
   console.log('Login FALSO executado! Utilizador está autenticado.');
   setIsAuthenticated(true);
 
  // E, depois do login, mandamos o utilizador para a Home
   navigate('/'); 

    // Retorna 'success' para a página de login
    return { success: true };
 };

 // Essa é a função que o Navbar vai chamar
 const logout = () => {
 console.log('Logout executado! Utilizador saiu.');
 setIsAuthenticated(false);
  navigate('/');
 };

 // O valor que o "cérebro" vai fornecer para todo o site
  // NOTA: Não tem 'isLoading' aqui, porque a lógica é instantânea
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

/*
O CÓDIGO REAL DO BACKEND PARA GUARDAR

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Hook
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Cria o "Fornecedor"
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // NOVO ESTADO: Essencial para saber se já terminámos de
  // verificar o token no localStorage
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // API_URL: Coloqar a URL base do  backend aqui
  // (Ex: 'http://localhost:5000/api')
  const API_URL = '/api/auth'; // Usando URL relativa (ex: /api/auth/login)

  // EFEITO DE VALIDAÇÃO: Roda UMA VEZ quando a app carrega
  useEffect(() => {
    // Função assíncrona para validar o token
    const validateToken = async () => {
      // 1. Pega o token salvo no navegador
      const token = localStorage.getItem('meu-token');

      if (!token) {
        // Se não tem token, não está logado. Termina a verificação.
        setIsLoading(false);
        return;
      }

      // 2. Se TEM um token, precisamos verificar se é válido
      try {
        const response = await fetch(`${API_URL}/me`, { // REQUERIMENTO: GET /api/auth/me
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // 3. Se o backend disse "OK", o token é válido.
          setIsAuthenticated(true);
        } else {
          // Token inválido ou expirado, limpa do navegador
          localStorage.removeItem('meu-token');
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        localStorage.removeItem('meu-token'); // Limpa em caso de erro de rede
      } finally {
        // 4. INDEPENDENTE do resultado, terminámos de "carregar"
        setIsLoading(false);
      }
    };

    validateToken();
  }, []); // O '[]' garante que isto roda apenas 1 vez

  // LOGIN: Agora é assíncrono e recebe os dados do formulário
  const login = async (email, password) => {
    try {
      // 1. CHAMA O BACKEND (REQUERIMENTO: POST /api/auth/login)
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no login');
      }

      // 2. SE DEU CERTO (Backend retornou o token)
      const data = await response.json();
      localStorage.setItem('meu-token', data.token); // Salva o token
      setIsAuthenticated(true); // Atualiza o estado
      navigate('/'); // Redireciona

      return { success: true }; // Retorna sucesso para a página de Login

    } catch (error) {
      console.error('Erro no login:', error.message);
      return { success: false, message: error.message }; // Retorna erro
    }
  };

  // LOGOUT: Agora limpa o token do navegador
  const logout = () => {
    localStorage.removeItem('meu-token');
    setIsAuthenticated(false);
    navigate('/');
  };

  // O valor que o "cérebro" vai fornecer para todo o site
  // (Repare que agora incluímos o 'isLoading')
  const value = {
    isAuthenticated,
    isLoading, // <-- IMPORTANTE
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
* );
}

(o código com 'fetch' e 'useEffect'
para o encontrar  quando o backend estiver pronto)

*/