import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // 1. Pega o estado do "cérebro" de Auth
  const { isAuthenticated } = useAuth();

  // 2. A Lógica do "Guarda"
  if (!isAuthenticated) {
    // 3. Se NÃO estiver autenticado...
    // Redireciona o utilizador para a página /login
    return <Navigate to="/login" replace />;
    // O 'replace' impede o utilizador de "voltar" para o carrinho
    // com a seta do navegador.
  }

  // 4. Se ESTIVER autenticado...
  // Mostra a página que estava a ser protegida (ex: <CartPage />)
  return <Outlet />;
}