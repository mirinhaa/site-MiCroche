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



//* o codigo para usar no bacend depois

//import React from 'react';
//import { useAuth } from '../contexts/AuthContext'; // (Verifique este caminho)
//import { Navigate, Outlet } from 'react-router-dom';
//import { Typography, CircularProgress, Box } from '@mui/material';

//export default function ProtectedRoute() {
 // 1. Pega o estado E o status de carregamento
//const { isAuthenticated, isLoading } = useAuth();

// 2. LÓGICA DE CARREGAMENTO 
 // Se ainda estivermos a validar o token (useEffect do AuthContext),
 // não faça nada ainda, apenas mostre "A carregar...".
// Isto impede o utilizador de ser expulso ao recarregar a página.
// if (isLoading) {
// return (
// <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//<CircularProgress />
// </Box>);}

// 3. A Lógica do "Guarda" (só roda DEPOIS do loading)
//if (!isAuthenticated) {
// 4. Se NÃO estiver autenticado...
//return <Navigate to="/login" replace />; }
 // 5. Se ESTIVER autenticado...
 //  return <Outlet />;}