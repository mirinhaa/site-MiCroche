import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme'; 
import './index.css'; 

// CONTEXTOS (CÉREBROS)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// COMPONENTES (GUARDA)
import ProtectedRoute from './components/ProtectedRoute'; 

// PÁGINAS
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage'; 

function App() {
  return (
    <ThemeProvider theme={customTheme}>
     <CssBaseline /> 
      <BrowserRouter> 
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/*  Rotas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/produtos" element={<ProductCatalogPage />} />
              <Route path="/produto/:id" element={<ProductDetailPage />} />
              <Route path="/checkout-process" element={<CheckoutPage />} /> 

              {/* Rotas Protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/carrinho" element={<CartPage />} />
              </Route>
              
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;