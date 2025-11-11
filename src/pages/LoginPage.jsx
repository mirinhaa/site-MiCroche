import React, { useState } from 'react';
import { 
    Grid, Box, Typography, TextField, Button, Link,
    ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoMiCroche from '../assets/logo-branca.png.png';

// Importa o "cérebro" de Auth 
import { useAuth } from '../context/AuthContext'; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('login');
  
  // Pega a função 'login' do cérebro
  const { login } = useAuth();

  const handleViewChange = (event, newView) => {
    if (newView === 'register') {
      navigate('/cadastro');
    } else if (newView === 'login') {
      setView('login');
    }
  };
  
  // Função para o formulário de Login
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Impede a página de recarregar
    
    
    // Chama a nossa função 'login' (que por agora é falsa)
    login(); 
    // (O 'login()' já nos navega para a Home '/')
  };

  return (
    <Grid 
      container 
      component="main" 
      sx={{ 
        position: 'absolute', top: 0, left: 0,
        width: '100%', minHeight: '100vh', overflow: 'hidden'
      }}
    >
      {/* LADO ESQUERDO (FORMULÁRIO) */}
      <Grid 
        xs={12} md={6}
        sx={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
          backgroundColor: 'background.default',
          py: { xs: 8, md: 0 }
        }}
      >
        <Box
          sx={{
            my: { xs: 4, md: 8 }, mx: 4, 
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', maxWidth: 400, width: '100%' 
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom align="center">
            Bem-vindo(a) de volta!
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
            Entre em sua conta para adquirir suas peças
          </Typography>

          {/* Botões de "Entrar" / "Criar Conta" */}
          <ToggleButtonGroup
            value={view} 
            exclusive
            onChange={handleViewChange} 
            aria-label="Controlo de vista de login"
            sx={{ 
              mb: 3, backgroundColor: 'grey.300', borderRadius: 20,
              overflow: 'hidden', display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%' 
            }}
          >
            <ToggleButton value="login" aria-label="mudar para login"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Entrar
            </ToggleButton>
            <ToggleButton value="register" aria-label="mudar para criar conta"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Criar Conta
            </ToggleButton>
          </ToggleButtonGroup>

          {/* <Box> é um 'form' e chama 'handleLoginSubmit' */}
          <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal" required fullWidth id="email" label="E-mail"
              name="email" autoComplete="email" autoFocus placeholder="seu@email.com"
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Senha"
              type="password" id="password" autoComplete="current-password" placeholder="sua senha"
            />
            <Link 
              href="#" 
              variant="body2" 
              sx={{ 
                display: 'block', textAlign: 'right', mt: 1, color: 'primary.main',
                textDecoration: 'none', '&:hover': { textDecoration: 'underline' }
              }}
            >
              Esqueci minha senha
            </Link>
            {/* O 'type="submit"' deste botão vai ativar o 'onSubmit' do <Box> */}
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* LADO DIREITO (LOGO DA MARCA)*/}
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
==    "EU DO FUTURO": Quando o meu AuthContext "real" (aquele com
==    'fetch' e 'useEffect') estiver ativo, eu substituo TODO o código
==    deste ficheiro (acima) por este código (abaixo).
==
==    Este código "real" usa 'useState' para ler o email e a senha,
==    chama a função 'login' real (que é 'async') e mostra
==    mensagens de 'loading' e 'erro'.
==
================================================================================
================================================================================
*/

/*
import React, { useState } from 'react'; // "EU DO FUTURO": Preciso do useState
import { 
    Grid, Box, Typography, TextField, Button, Link,
    ToggleButton, ToggleButtonGroup, Alert, CircularProgress // "EU DO FUTURO": Importei Alert e CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// "EU DO FUTURO": Corrigi o caminho da logo (tirei o .png duplicado)
import logoMiCroche from '../assets/logo-branca.png'; 

// "EU DO FUTURO": Corrigi o caminho do contexto (para 'contexts' no plural)
import { useAuth } from '../contexts/AuthContext'; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('login');
  
  // "EU DO FUTURO": Pego a função 'login' REAL. Esta é uma função 'async'.
  const { login } = useAuth();

  // --- "EU DO FUTURO": ADICIONEI ESTES ESTADOS ---
  // Preciso de 'state' para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Preciso de 'state' para feedback ao utilizador
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Para mostrar erros (ex: "Senha incorreta")
  // --- FIM DOS NOVOS ESTADOS ---


  const handleViewChange = (event, newView) => {
    if (newView === 'register') {
      navigate('/cadastro');
    } else if (newView === 'login') {
      setView('login');
    }
  };
  
  // --- "EU DO FUTURO": ESTA É A NOVA FUNÇÃO 'handleSubmit' ---
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Impede a página de recarregar
    
    // Validação simples
    if (!email || !password) {
        setError('Por favor, preencha o e-mail e a senha.');
        return;
    }

    setIsLoading(true); // Começa o 'loading'
    setError(null);     // Limpa erros antigos

    try {
        // "EU DO FUTURO": Chamo a função 'login' REAL do AuthContext.
        // Ela vai chamar o 'fetch' para /api/auth/login.
        // Ela retorna um objeto: { success: true } ou { success: false, message: '...' }
        const result = await login(email, password);

        if (!result.success) {
            // Se o login falhou (ex: senha errada), o AuthContext avisa-me.
            setError(result.message || 'E-mail ou senha inválidos.');
        }
        // Se o login for bem-sucedido, o 'AuthContext'
        // vai-me redirecionar automaticamente (com o 'navigate('/')'
        // que está dentro dele).

    } catch (err) {
        // Captura erro de rede ou outro erro inesperado
        console.error("Erro inesperado no login:", err);
        setError('Não foi possível ligar ao servidor. Tente mais tarde.');
    } finally {
        setIsLoading(false); // Para o 'loading' (seja sucesso ou falha)
    }
  };

  return (
    <Grid 
      container 
      component="main" 
      sx={{ 
        position: 'absolute', top: 0, left: 0,
        width: '100%', minHeight: '100vh', overflow: 'hidden'
      }}
    >
      // LADO ESQUERDO (FORMULÁRIO)
      <Grid 
        xs={12} md={6}
        sx={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
          backgroundColor: 'background.default',
          py: { xs: 8, md: 0 }
        }}
      >
        <Box
          sx={{
            my: { xs: 4, md: 8 }, mx: 4, 
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', maxWidth: 400, width: '100%' 
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom align="center">
            Bem-vindo(a) de volta!
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
            Entre em sua conta para adquirir suas peças
          </Typography>

          // Botões de "Entrar" / "Criar Conta"
          <ToggleButtonGroup
            value={view} 
          	exclusive
          	onChange={handleViewChange} 
          	aria-label="Controlo de vista de login"
          	sx={{ 
              mb: 3, backgroundColor: 'grey.300', borderRadius: 20,
              overflow: 'hidden', display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%' 
            }}
          >
            <ToggleButton value="login" aria-label="mudar para login"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Entrar
            </ToggleButton>
            <ToggleButton value="register" aria-label="mudar para criar conta"
              sx={{
                flexGrow: 1, border: 'none', borderRadius: 20, px: 4, py: 1, textTransform: 'none',
                '&.Mui-selected, &.Mui-selected:hover': { color: 'white', backgroundColor: 'primary.main' },
                '&:not(.Mui-selected)': { color: '#888', backgroundColor: 'transparent' }
              }}
            >
              Criar Conta
            </ToggleButton>
          </ToggleButtonGroup>

          // <Box> é um 'form' e chama 'handleLoginSubmit'
          <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal" required fullWidth id="email" label="E-mail"
              name="email" autoComplete="email" autoFocus placeholder="seu@email.com"
            // --- "EU DO FUTURO": LIGUEI O ESTADO ---
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Desativa o campo durante o loading
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Senha"
              type="password" id="password" autoComplete="current-password" placeholder="sua senha"
            // --- "EU DO FUTURO": LIGUEI O ESTADO ---
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Desativa o campo durante o loading
            />

            // --- "EU DO FUTURO": CAIXA DE ERRO ---
            {error && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                    {error}
                </Alert>
            )}

            <Link 
              href="#" 
              variant="body2" 
              sx={{ 
                display: 'block', textAlign: 'right', mt: 1, color: 'primary.main',
                textDecoration: 'none', '&:hover': { textDecoration: 'underline' }
              }}
            >
              Esqueci minha senha
            </Link>
            // "EU DO FUTURO": O 'type="submit"' deste botão vai ativar o 'onSubmit' do <Box>
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              // --- "EU DO FUTURO": LÓGICA DE LOADING ---
              disabled={isLoading} // Desativa o botão durante o 'fetch'
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
          </Box>
        </Box>
      </Grid>

      // LADO DIREITO (LOGO DA MARCA)
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
            src={logoMiCroche} // "EU DO FUTURO": Já corrigi o caminho da logo aqui
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
*/