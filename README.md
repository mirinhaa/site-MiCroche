# MiCroche - Frontend da Aplicação E-commerce

Este é o repositório do frontend da aplicação MiCroche, um e-commerce completo construído em React.js, React Router e Material-UI (MUI).

A aplicação foi desenvolvida usando uma arquitetura baseada em "Contextos" (Context API) e está totalmente preparada para se ligar a um backend RESTful para autenticação, gestão de produtos e processamento de pedidos.

## Principais Funcionalidades

* **Autenticação Completa:** Registo (`/cadastro`) e Login (`/login`) de utilizadores, com gestão de estado de autenticação e tokens (JWT).
* **Gestão de Estado Global:** O `AuthContext` e o `CartContext` gerem o estado do utilizador e do carrinho em toda a aplicação.
* **Rotas Protegidas:** O componente `ProtectedRoute` bloqueia o acesso a páginas (ex: `/carrinho`) se o utilizador não estiver autenticado.
* **Catálogo Dinâmico:**
    * A `HomePage` busca os produtos em destaque (`/api/products/featured`).
    * A `ProductCatalogPage` busca produtos da API com **filtros de categoria** (`?category=...`) e **pesquisa** (`?search=...`).
    * A `ProductDetailPage` busca os dados de um produto específico pelo seu ID (`/api/products/:id`).
* **Carrinho de Compras Híbrido:**
    * **Utilizadores Convidados:** O carrinho é guardado no `localStorage`.
    * **Utilizadores Logados:** O carrinho é guardado e lido do banco de dados (`/api/cart`).
    * **Fusão (Merge):** Quando um convidado faz login, o seu carrinho local é fundido (merged) com o carrinho da sua conta no backend (`/api/cart/merge`).
* **Cálculo de Frete (via Backend):** A `CartPage` chama a API do backend (`/api/shipping/calculate`) para obter o valor do frete, movendo a lógica de preços para o servidor.
* **Checkout:** A `CheckoutPage` reúne todos os dados (Utilizador, Carrinho, Morada, Pagamento) e envia-os para o backend para criar o pedido (`/api/orders/create`).

## Tecnologias Utilizadas

* **React.js (v18+):** Biblioteca principal para a UI.
* **React Router (v6):** Para a gestão de rotas do lado do cliente.
* **Material-UI (MUI v5):** Biblioteca de componentes de design.
* **React Context API:** Para gestão de estado global (Autenticação e Carrinho).
* **Fetch API:** Para todas as chamadas HTTP à API do backend.

---

## Como Executar (Ambiente de Desenvolvimento)

Esta aplicação é composta por duas partes: o **Frontend (este repositório)** e o **Backend (servidor Node.js)**. Ambos precisam de estar a correr em simultâneo.

### Pré-requisitos

* Node.js (v16 ou superior)
* `npm` (ou `yarn`)

### 1. Configurar e Correr o Backend

O backend (servidor Node.js/Express) é necessário para fornecer os dados dos produtos, autenticação e carrinho.

```bash
# 1. Navegue para a pasta do backend
cd ./backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor em modo de desenvolvimento
npm run dev
