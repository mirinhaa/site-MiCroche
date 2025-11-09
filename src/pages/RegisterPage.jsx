import React, { useState } from 'react';
import { 
    // Imports do Tema REMOVIDOS!
    Grid, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Link,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
//Import da logo
import logoMiCroche from '../assets/logo-branca.png.png';

// 2. COMPONENTE DA PÁGINA DE CADASTRO
export default function RegisterPage() {
  
  const navigate = useNavigate();
  const [view, setView] = useState('register');

  const handleViewChange = (event, newView) => {
    if (newView === 'login') {
      navigate('/login');
    } else if (newView === 'register') {
      setView('register');
    }
  };


  return (
    <Grid 
      container 
      component="main" 
      sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      
      {/* LADO ESQUERDO (FORMULÁRIO DE CADASTRO)*/}
      <Grid 
        
        xs={12} 
        md={6} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
          backgroundColor: 'background.default',
          py: { xs: 8, md: 0 }
        }}
      >
        <Box
          sx={{
            my: { xs: 4, md: 8 }, 
            mx: 4, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400, 
            width: '100%' 
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom align="center">
            Crie sua conta
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
            É rápido e fácil.
          </Typography>

          {/* Botões de "Entrar" / "Criar Conta" */}
          <ToggleButtonGroup
            value={view} 
            exclusive
            onChange={handleViewChange} 
            aria-label="Controlo de vista de login"
            sx={{ 
              mb: 3, 
              backgroundColor: 'grey.300',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%' 
            }}
          >
            <ToggleButton 
              value="login" 
              aria-label="mudar para login"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Entrar
            </ToggleButton>
            <ToggleButton 
              value="register" 
              aria-label="mudar para criar conta"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Criar Conta
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Formulário de Cadastro */}
          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
            
            <TextField
              margin="normal" required fullWidth id="name" label="Nome Completo"
              name="name" autoComplete="name" autoFocus placeholder="Seu nome"
            />
            <TextField
              margin="normal" required fullWidth id="email" label="E-mail"
              name="email" autoComplete="email" placeholder="seu@email.com"
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Senha"
              type="password" id="password" placeholder="crie uma senha forte"
            />
            <TextField
              margin="normal" required fullWidth name="passwordConfirm" label="Confirmar Senha"
              type="password" id="passwordConfirm" placeholder="repita a senha"
            />

            <Button
              type="submit" fullWidth variant="contained" color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Cadastrar
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item> 
                <Link 
                  href="#" 
                  variant="body2" 
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault(); 
                    navigate('/login');
                  }}
                >
                  Já tem conta? Entre
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      {/* LADO DIREITO (LOGO DA MARCA) */}
      <Grid
    
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          backgroundColor: 'primary.main', 
          color: 'primary.contrastText', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4 
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={logoMiCroche} 
            alt="Logo da Mi Crochê"
            sx={{
              width: '90%', 
              maxWidth: '350px', 
              height: 'auto', 
            }}
          />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 300 }}>
            Suas peças preferidas em crochê
          </Typography>
        </Box>
      </Grid>
    </Grid> 
  );
}