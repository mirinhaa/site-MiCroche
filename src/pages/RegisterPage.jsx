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

/*
================================================================================
================================================================================
==
==    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)
==
==    "EU DO FUTURO": Este código substitui todo o ficheiro de cima.
==    Este código "real" usa 'useState' para ler os campos
==    do formulário, faz validação (ex: senhas conferem?) e
==    chama a API do backend para registar o utilizador.
==    (REQUERIMENTO: POST /api/auth/register)
==
================================================================================
================================================================================
*/

/*
import React, { useState } from 'react';
import { 
    Grid, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Link,
    ToggleButton,
    ToggleButtonGroup,
    Alert, // "EU DO FUTURO": Importei 'Alert'
    CircularProgress // "EU DO FUTURO": Importei 'CircularProgress'
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
//Import da logo
// "EU DO FUTURO": Corrigi o caminho da logo (tirei o .png duplicado)
import logoMiCroche from '../assets/logo-branca.png';

// 2. COMPONENTE DA PÁGINA DE CADASTRO
export default function RegisterPage() {
  
  const navigate = useNavigate();
  const [view, setView] = useState('register');

  // --- "EU DO FUTURO": ADICIONEI ESTES ESTADOS ---
  // Um estado para guardar TODOS os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  // Estados para feedback (loading e erros)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Para a mensagem "Conta criada!"

  // "EU DO FUTURO": Um 'handler' único para todos os campos
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleViewChange = (event, newView) => {
    if (newView === 'login') {
      navigate('/login');
    } else if (newView === 'register') {
      setView('register');
    }
  };

  // --- "EU DO FUTURO": ESTA É A NOVA FUNÇÃO 'handleSubmit' ---
  const handleRegisterSubmit = async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // 1. Resetar estados
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // 2. Desestruturar os dados do estado
    const { name, email, password, passwordConfirm } = formData;

    // 3. Validação do Frontend
    if (!name || !email || !password || !passwordConfirm) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      setError('As senhas não conferem.');
      setIsLoading(false);
      return;
    }

    // 4. Tentar a chamada à API (Backend)
    try {
      // REQUERIMENTO: POST /api/auth/register
      // (Assumindo que o backend corre em localhost:5001)
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
          // Eu não envio 'passwordConfirm' para o backend.
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o backend der erro (ex: "Email já existe")
        throw new Error(data.message || 'Ocorreu um erro ao criar a conta.');
      }

      // 5. Sucesso!
      setSuccess('Conta criada com sucesso! Você já pode fazer o login.');
      
      // Limpa o formulário
      setFormData({ name: '', email: '', password: '', passwordConfirm: '' });
      
      // Espera 3s e navega para o Login
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      // 6. Erro
      setError(err.message);
    } finally {
      // 7. Parar o loading (seja sucesso ou erro)
      setIsLoading(false);
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
      
      // LADO ESQUERDO (FORMULÁRIO DE CADASTRO)
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

          // Botões de "Entrar" / "Criar Conta"
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

          // "EU DO FUTURO": Formulário de Cadastro "REAL"
          // Agora ele tem o 'onSubmit'
          <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 1, width: '100%' }}>
            
            <TextField
              margin="normal" required fullWidth id="name" label="Nome Completo"
              name="name" autoComplete="name" autoFocus placeholder="Seu nome"
              // "EU DO FUTURO": LIGUEI O ESTADO
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              margin="normal" required fullWidth id="email" label="E-mail"
              name="email" autoComplete="email" placeholder="seu@email.com"
              // "EU DO FUTURO": LIGUEI O ESTADO
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Senha"
D             type="password" id="password" placeholder="crie uma senha forte"
              // "EU DO FUTURO": LIGUEI O ESTADO
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <TextField
              margin="normal" required fullWidth name="passwordConfirm" label="Confirmar Senha"
Services           type="password" id="passwordConfirm" placeholder="repita a senha"
              // "EU DO FUTURO": LIGUEI O ESTADO
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={isLoading}
            />

            // --- "EU DO FUTURO": CAIXAS DE ALERTA ---
            {error && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                    {success}
                </Alert>
            )}
            // --- FIM DOS ALERTAS ---

            <Button
              type="submit" fullWidth variant="contained" color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              // "EU DO FUTURO": LÓGICA DE LOADING
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item> 
                <Link 
                  href="#" 
                  variant="body2" 
AN               sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault(); 
                    navigate('/login');
Services           }}
                >
                  Já tem conta? Entre
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

aram   // LADO DIREITO (LOGO DA MARCA)
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
  s     }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={logoMiCroche} // "EU DO FUTURO": Corrigi o caminho da logo
param         alt="Logo da Mi Crochê"
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
*/