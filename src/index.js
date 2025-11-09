import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';

// 1. Encontra o "gancho" (<div id="root">) que está no 'public/index.html'
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2. "Pendura" (Renderiza) o componente <App /> principal nesse gancho
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);