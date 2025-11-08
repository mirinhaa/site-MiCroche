import React, { useState } from 'react';
import { 
    createTheme, 
    ThemeProvider, 
    CssBaseline, 
    Grid, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Link,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';

import logoMiCroche from '../assets/logo-branca.png.png';


// 1. DEFINIÇÃO DO TEMA (Com responsividade de fonte)
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#008B8B', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: {
      300: '#e0e0e0',
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem', // Tamanho mobile
      '@media (min-width:600px)': {
        fontSize: '1.8rem', // sm
      },
      '@media (min-width:900px)': {
        fontSize: '2.125rem', // md
      },
    },
    body1: {
      color: '#555'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, 
          textTransform: 'none',
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

// 2. O COMPONENTE DA PÁGINA DE LOGIN
export default function LoginPage() {
  const [view, setView] = useState('login');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      
      {/* ####################################################################
        ### AQUI ESTÁ A MUDANÇA ###
        Eu REMOVI o 'width: '100vw'' que tínhamos adicionado.
        Não é preciso se o App.js e o index.css estiverem corretos.
        ####################################################################
      */}
      <Grid container component="main" sx={{ minHeight: '100vh' }}>
        
        {/* LADO ESQUERDO: O FORMULÁRIO (Responsivo) */}
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={6} 
          elevation={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: { xs: 'flex-start', md: 'center' },
            backgroundColor: 'background.default',
            borderRadius: 0,
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
            <Typography component="h1" variant="h4" gutterBottom>
              Bem-vindo(a) de volta!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              Entre em sua conta para adquirir suas peças
            </Typography>

            {/* Botões de "Entrar" / "Criar Conta" (Responsivos) */}
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="text alignment"
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
                aria-label="login"
                sx={{
                  flexGrow: 1, 
                  border: 'none',
                  borderRadius: 20,
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                  },
                  '&:not(.Mui-selected)': {
                    color: '#888',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Entrar
              </ToggleButton>
              <ToggleButton 
                value="register" 
                aria-label="register"
                sx={{
                  flexGrow: 1, 
                  border: 'none',
                  borderRadius: 20,
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                  },
                  '&:not(.Mui-selected)': {
                    color: '#888',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Criar Conta
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Formulário */}
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="seu@email.com"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="sua senha"
              />
              <Link 
                href="#" 
                variant="body2" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'right', 
                  mt: 1, 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Esqueci minha senha
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* LADO DIREITO: A MARCA (COM A LOGO CORRIGIDA) */}
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
          }}
        >
          {/* Box 'pai' para agrupar logo e tagline */}
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
    </ThemeProvider> 
  );
}