import React, { useState } from 'react';
import { 
    AppBar, Toolbar, Typography, Box, Button, IconButton, 
    Badge, Menu, MenuItem 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../context/CartContext'; 
import logoMiCroche from '../assets/logo-branca.png.png';

// Importa o "cérebro" de Auth
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // (Lógica do Menu Mobile...)
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(anchorEl);
  const handleMobileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setAnchorEl(null);

  const menuLinks = [
    { title: 'Início', path: '/' },
    { title: 'Produtos', path: '/produtos' },
    { title: 'Sobre', path: '/sobre' },
  ];
  
  // Função de Logout
  const handleLogout = () => {
    logout();
    handleMobileMenuClose(); // Fecha o menu mobile (se estiver aberto)
    navigate('/'); // Manda o utilizador para a Home
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {menuLinks.map((link) => (
        <MenuItem key={link.title} onClick={handleMobileMenuClose} component={Link} to={link.path}>
          <Typography textAlign="center">{link.title}</Typography>
        </MenuItem>
      ))}
      
      {/* Menu Mobile com Login/Logout */}
      {isAuthenticated ? (
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Sair</Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/login">
          <Typography textAlign="center">Login</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        
        {/* Título/Logo */}
        <Box 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={logoMiCroche}
            alt="Logo MiCroche"
            sx={{
              height: 40, 
              width: 'auto', 
            }}
          />
        </Box>

        {/* LINKS DE NAVEGAÇÃO (DESKTOP) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {menuLinks.map((link) => (
            <Button key={link.title} color="inherit" component={Link} to={link.path}>
              {link.title}
            </Button>
          ))}
          
          {/* Botão de Login/Logout (Desktop) */}
          {isAuthenticated ? (
            <Button 
              color="inherit" 
              variant="outlined" 
              sx={{ marginLeft: 2 }}
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
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
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {/*  ÍCONES (MOBILE) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
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
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box> 
        
      </Toolbar>
      
      {renderMobileMenu}

    </AppBar>
  );
}