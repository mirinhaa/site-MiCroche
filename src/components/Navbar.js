// Este é o meu componente da Barra de Navegação (Navbar).
// É um dos componentes mais complexos, porque ele cuida da navegação,
// do carrinho, da autenticação e ainda é responsivo.

// Importo o React e o 'useState' (que eu vou usar para controlar o menu mobile)
import React, { useState } from 'react';

// Aqui eu importo TODAS as peças de layout que vou usar do Material-UI (MUI)
import {
  AppBar, // A barra de navegação em si (o container roxo/azul)
  Toolbar, // O container que alinha os itens dentro da AppBar
  Typography, // Para textos
  Box, // Para caixas/divs customizadas
  Button, // Meus botões de link (Início, Produtos...)
  IconButton, // Botões que são só um ícone (carrinho, menu)
  Badge, // Aquela "bolinha" vermelha com o número de itens no carrinho
  Menu, // O menu dropdown que vai aparecer no mobile
  MenuItem, // Os itens dentro do menu dropdown
} from '@mui/material';

// Importo o 'Link' (para navegar sem recarregar a página)
// e o 'useNavigate' (para eu *forçar* uma navegação, tipo depois do logout)
import { Link, useNavigate } from 'react-router-dom';

// Importo os ícones que vou usar
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Ícone do carrinho
import MenuIcon from '@mui/icons-material/Menu'; // Ícone do menu "hambúrguer"

// Importo o "cérebro" do meu carrinho (o Contexto)
import { useCart } from '../context/CartContext';
// Importo a minha logo. Como ela está na pasta 'src/assets',
// o React/Webpack vai processar ela e me dar o caminho certo.
// Corrigi o nome do arquivo, removendo o ".png" duplicado
// Tentei corrigir o caminho relativo.
import logoMiCroche from '../assets/logo-branca.png.png';
// Importo o "cérebro" da Autenticação (outro Contexto)
// Corrigi o caminho de 'context' para 'contexts' (plural)
// Tentei corrigir o caminho relativo.
import { useAuth } from '../context/AuthContext';

// Defino meu componente Navbar
export default function Navbar() {
  // --- HOOKS e DADOS ---

  // 1. Pego o { cartItems } do meu Contexto do Carrinho
  const { cartItems } = useCart();
  // Calculo o número total de itens. Eu uso 'reduce' para somar
  // a 'quantity' de *cada* item no carrinho.
  // O '|| 1' é uma segurança caso 'quantity' não exista, e o '0' é o valor inicial.
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  // 2. Pego as informações de autenticação do meu Contexto de Auth
  // 'isAuthenticated' me diz se o usuário está logado (true/false)
  // 'logout' é a função que eu chamo para fazer o logout
  const { isAuthenticated, logout } = useAuth();

  // 3. Pego a função 'navigate' do React Router
  const navigate = useNavigate();

  // 4. Crio um "estado" (state) para controlar o menu mobile
  // 'anchorEl' vai guardar em *qual* elemento o menu deve "ancorar".
  // Quando for 'null', o menu está fechado.
  const [anchorEl, setAnchorEl] = useState(null);
  // Criei essa variável booleana para ficar mais fácil de ler o código
  const isMobileMenuOpen = Boolean(anchorEl);

  // Função para ABRIR o menu mobile
  // Ela pega o 'event' do clique e salva o 'currentTarget' (o ícone de menu)
  // no 'anchorEl', o que faz o 'isMobileMenuOpen' virar 'true'.
  const handleMobileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  // Função para FECHAR o menu mobile (só seta o 'anchorEl' de volta pra 'null')
  const handleMobileMenuClose = () => setAnchorEl(null);

  // 5. Criei um Array para meus links.
  // Isso é MUITO melhor do que repetir o código HTML.
  // Se eu quiser adicionar um link novo, eu só mexo aqui.
  const menuLinks = [
    { title: 'Início', path: '/' },
    { title: 'Produtos', path: '/produtos' },
    { title: 'Sobre', path: '/sobre' },
  ];

  // 6. Minha função de Logout
  const handleLogout = () => {
    logout(); // Chamo a função do meu Contexto de Auth
    handleMobileMenuClose(); // Garanto que o menu mobile feche (se estiver aberto)
    navigate('/'); // Mando o usuário para a página inicial
  };

  // --- RENDERIZAÇÃO DO MENU MOBILE ---
  // Eu criei uma variável para guardar o JSX do menu mobile.
  // Isso deixa o 'return' principal lá embaixo mais limpo e fácil de ler.
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl} // Onde o menu vai "ancorar"
      // Define a origem da "âncora"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted // Mantém o menu na árvore DOM 
      // Onde o menu vai "nascer"
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen} // O menu está aberto? (true/false)
      onClose={handleMobileMenuClose} // O que fazer se eu clicar fora (fechar)
    >
      {/* Aqui eu uso .map() no meu array 'menuLinks' para criar
        os itens do menu dinamicamente. */}
      {menuLinks.map((link) => (
        <MenuItem
          key={link.title}
          onClick={handleMobileMenuClose} // Clicar em um link fecha o menu
          component={Link} // Faço o MenuItem se comportar como um Link
          to={link.path} // E aponto para o caminho dele
        >
          <Typography textAlign="center">{link.title}</Typography>
        </MenuItem>
      ))}

      {/* Lógica de Login/Logout no Menu Mobile */}
      {/* Eu uso um ternário: 'isAuthenticated' é true? */}
      {isAuthenticated ? (
        // Se SIM, mostro o botão de Sair
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Sair</Typography>
        </MenuItem>
      ) : (
        // Se NÃO, mostro o botão de Login
        <MenuItem
          onClick={handleMobileMenuClose}
          component={Link}
          to="/login"
        >
          <Typography textAlign="center">Login</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  // --- O JSX PRINCIPAL DO COMPONENTE ---
  return (
    // 'position="static"' faz a barra rolar junto com a página.
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* --- Título/Logo (Lado Esquerdo) --- */}
        <Box
          component={Link} // A logo é um link para a Home
          to="/"
          sx={{
            // 'flexGrow: 1' é a MÁGICA!
            // Isso faz este Box "crescer" e ocupar todo o espaço
            // disponível, empurrando o resto (links, carrinho) para a direita.
            flexGrow: 1,
            display: 'flex', // Para poder alinhar a imagem
            alignItems: 'center', // Alinha a imagem verticalmente
          }}
        >
          {/* A minha imagem de Logo */}
          <Box
            component="img" // Digo ao Box para ser uma tag <img>
            src={logoMiCroche} // Passo a logo que importei lá em cima
            alt="Logo MiCroche"
            sx={{
              height: 40, // Defino uma altura fixa
              width: 'auto', // A largura se ajusta automaticamente
            }}
          />
        </Box>

        {/* --- LINKS DE NAVEGAÇÃO (DESKTOP) --- */}
        {/* Este 'sx' perfeito pra  a responsividade:
          - 'display: { xs: 'none', md: 'flex' }' significa:
          - 'xs: 'none'' -> Em telas pequenas (extra-small), ESCONDA (display: none)
          - 'md: 'flex'' -> Em telas médias (medium) ou maiores, MOSTRE (display: flex)
        */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {/* Eu uso .map() de novo para criar os botões do desktop */}
          {menuLinks.map((link) => (
            <Button
              key={link.title}
              color="inherit" // A cor do texto vai ser a da AppBar (branca)
              component={Link}
              to={link.path}
            >
              {link.title}
            </Button>
          ))}

          {/* Lógica de Login/Logout (Desktop) */}
          {isAuthenticated ? (
            // Se ESTIVER logado, mostra Sair
            <Button
              color="inherit"
              variant="outlined" // Dou um destaque de "contorno"
              sx={{ marginLeft: 2 }} // Um espacinho
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
            // Se NÃO ESTIVER logado, mostra Login
            <Button
              color="inherit"
              variant="outlined"
              sx={{ marginLeft: 2 }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}

          {/* Ícone do Carrinho (Desktop) */}
          <IconButton
            color="inherit"
            component={Link}
            to="/carrinho"
            aria-label="ver carrinho"
            sx={{ ml: 1 }} // Margin-left (espacinho)
          >
            {/* O Badge (bolinha vermelha) "envelopa" o ícone */}
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* --- ÍCONES (MOBILE) --- */}
        {/* Aqui é o OPOSTO da responsividade de cima:
          - 'display: { xs: 'flex', md: 'none' }' significa:
          - 'xs: 'flex'' -> Em telas pequenas, MOSTRE
          - 'md: 'none'' -> Em telas médias ou maiores, ESCONDA
        */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          {/* Ícone do Carrinho (Mobile) - preciso dele aqui e no desktop */}
          <IconButton
            color="inherit"
            component={Link}
            to="/carrinho"
            aria-label="ver carrinho"
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* O Ícone de Menu "Hambúrguer" */}
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            onClick={handleMobileMenuOpen} // Conecto com minha função de abrir
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* --- RENDERIZA O MENU MOBILE --- */}
      {/* Aqui eu finalmente coloco aquela variável que criei lá em cima.
        O <Menu> só vai aparecer de fato quando 'isMobileMenuOpen' for true.
      */}
      {renderMobileMenu}
    </AppBar>
  );
}