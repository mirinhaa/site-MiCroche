import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid, List, ListItem, 
  ListItemText, Divider, Button, Paper, TextField, InputAdornment, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext'; // Hook customizado para manipulação do carrinho
import { useNavigate } from 'react-router-dom'; // Para navegação programática entre páginas

export default function CartPage() {
  // Obtém os itens do carrinho, função para remover item e calcular total do carrinho
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  // Hook do React Router para navegar entre páginas
  const navigate = useNavigate();

  // Estado para armazenar o CEP digitado pelo usuário
  const [cep, setCep] = useState('');

  // Estado para armazenar as informações do frete (valor, prazo, endereço)
  const [frete, setFrete] = useState(null);

  // Estado para indicar se a requisição do CEP está em andamento (loading)
  const [isLoading, setIsLoading] = useState(false);

  // Estado para armazenar mensagens de erro na busca do CEP
  const [error, setError] = useState('');

  // Calcula o subtotal do carrinho somando os preços dos itens
  const subtotal = getTotalPrice();

  // Função para navegar para a página de finalização do pedido
  const handleCheckout = () => {
    navigate('/checkout-process'); 
  };

  // Função assíncrona para buscar dados do CEP na API ViaCEP
  const fetchCep = async () => {
    // Remove qualquer caractere que não seja número do CEP
    const cleanCep = cep.replace(/\D/g, '');

    // Valida se o CEP tem 8 dígitos (formato válido)
    if (cleanCep.length !== 8) {
      setError('CEP inválido. Digite 8 dígitos.');
      setFrete(null);
      return; // Sai da função se o CEP for inválido
    }

    setIsLoading(true); // Inicia indicador de carregamento
    setError('');       // Limpa mensagens anteriores
    setFrete(null);     // Reseta dados de frete

    try {
      // Faz requisição para API ViaCEP com o CEP limpo
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      // Caso o CEP não seja encontrado, mostra erro
      if (data.erro) {
        setError('CEP não encontrado. Tente outro.');
        return;
      }

      // Obtém o estado a partir dos dados retornados
      const estado = data.uf;

      // Define valor e prazo do frete de acordo com o estado
      let valorFrete = 0;
      let prazo = "3 a 5 dias úteis";

      if (estado === 'SP') {
        valorFrete = 15.00;
        prazo = "2 a 3 dias úteis";
      } else if (['MG', 'RJ', 'PR', 'SC'].includes(estado)) {
        valorFrete = 25.00;
        prazo = "4 a 6 dias úteis";
      } else {
        valorFrete = 35.00;
        prazo = "5 a 10 dias úteis";
      }
      
      // Atualiza o estado do frete com as informações calculadas
      setFrete({
        valor: valorFrete,
        prazo: prazo,
        endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`
      });

    } catch (e) {
      // Captura erros da requisição e exibe mensagem genérica
      console.error("Erro na busca de CEP:", e);
      setError('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setIsLoading(false); // Finaliza indicador de carregamento
    }
  };

  // Calcula o total a pagar (subtotal + frete, se frete definido)
  const totalAPagar = frete ? subtotal + frete.valor : subtotal;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Título principal da página */}
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary.main" fontWeight={600}>
        Seu Carrinho de Compras
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* Se o carrinho estiver vazio, mostra mensagem e botão para catálogo */}
      {cartItems.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h5" color="text.secondary">
            Seu carrinho está vazio. Adicione algumas peças incríveis!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3, py: 1.5, px: 4 }}
            onClick={() => navigate('/produtos')}
          >
            Ver Catálogo
          </Button>
        </Box>
      ) : (
        // Caso contrário, mostra a lista de itens e o resumo do pedido
        <Grid container spacing={4}>

          {/* Coluna esquerda: lista dos itens do carrinho */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <List>
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem 
                      // Botão para remover item do carrinho
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          aria-label="remover"
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{ py: 2 }}
                    >
                      {/* Imagem do produto com fallback caso não carregue */}
                      <Box 
                        component="img"
                        src={item.imageUrl} 
                        alt={item.name}
                        sx={{ 
                          width: 80, height: 80, 
                          borderRadius: 2, mr: 2, 
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/80x80/EDE7F6/9575CD?text=Mi"; // Imagem placeholder
                        }}
                      />
                      {/* Nome do produto e detalhes da quantidade e preço unitário */}
                      <ListItemText
                        primary={<Typography variant="h6">{item.name}</Typography>}
                        secondary={
                          <Typography color="text.secondary">
                            {`Quantidade: ${item.quantity} | Preço Unitário: R$ ${parseFloat(item.price).toFixed(2)}`}
                          </Typography>
                        }
                      />
                      {/* Preço total do item (quantidade x preço unitário) */}
                      <Typography variant="h6" color="primary.main">
                        R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Coluna direita: resumo do pedido, cálculo e input para cálculo de frete */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Resumo do Pedido
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal:</Typography>
                <Typography fontWeight="bold">R$ {subtotal.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Seção para cálculo do frete a partir do CEP */}
              <Typography variant="h6" gutterBottom mt={2} fontWeight={600}>
                Calcular Frete (CEP)
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={fetchCep} // Chama cálculo do frete ao sair do campo
                  placeholder="Ex: 01001000"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">CEP:</InputAdornment>,
                  }}
                  error={!!error}
                />
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={fetchCep}
                  disabled={isLoading || cep.replace(/\D/g, '').length !== 8}
                  sx={{ py: 1, minWidth: '100px' }}
                >
                  {isLoading ? '...' : 'Calcular'}
                </Button>
              </Box>
              
              {/* Mensagem de erro na validação do CEP */}
              {error && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
              )}

              {/* Exibe detalhes do frete calculado, se disponível */}
              {frete && (
                <Box sx={{ backgroundColor: 'success.light', p: 1.5, borderRadius: 1, my: 1 }}>
                  <Typography variant="body1" color="success.dark" fontWeight="bold">
                    Frete: R$ {frete.valor.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="success.dark">
                    Prazo estimado: {frete.prazo}
                  </Typography>
                  <Typography variant="caption" color="success.dark">
                    Endereço: {frete.endereco} (Simulado)
                  </Typography>
                </Box>
              )}
              {/* Fim da seção frete */}

              <Divider sx={{ my: 2 }} />

              {/* Total geral a pagar */}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="h5" fontWeight={700}>Total a Pagar:</Typography>
                <Typography variant="h5" fontWeight={700} color="primary.dark">
                  R$ {totalAPagar.toFixed(2)}
                </Typography>
              </Box>

              {/* Botão para finalizar pedido, desabilitado se carrinho estiver vazio */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Finalizar Pedido
              </Button>
            </Paper>
          </Grid>

        </Grid>
      )}
    </Container>
  );
}

/*

    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)
*/

/*
// --- 1. A NOVA FUNÇÃO 'fetchCep' (PARA COLAR DENTRO DO COMPONENTE) ---

// "EU DO FUTURO": Esta função substitui a minha 'fetchCep' original.
// Ela é mais segura porque a lógica de preço está no backend.

  const fetchCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setError('CEP inválido. Digite 8 dígitos.');
      setFrete(null);
      return;
    }

    setIsLoading(true);
    setError('');
    setFrete(null);
    
    try {
        // A GRANDE MUDANÇA: Chamo o MEU backend, não o ViaCEP.
        // Eu envio o CEP e também o subtotal (ou o cartItems),
        // porque o preço do frete pode depender do valor/peso.
        const response = await fetch('/api/shipping/calculate', { // REQUERIMENTO: POST /api/shipping/calculate
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cep: cleanCep, 
                subtotal: subtotal // Envio o subtotal para o backend calcular
            }) 
        });

        const data = await response.json();

        if (!response.ok) {
            // Se o meu backend der um erro (ex: CEP não encontrado)
            throw new Error(data.message || 'Erro ao calcular o frete.');
        }

        // O meu backend já me devolve o objeto 'frete' pronto
        // com o valor, prazo e endereço.
        setFrete({
            valor: data.valor,
            prazo: data.prazo,
            endereco: data.endereco
        });

    } catch (e) {
        console.error("Erro na busca de frete:", e);
        setError(e.message || 'Erro ao buscar o CEP. Tente novamente.');
    } finally {
        setIsLoading(false);
    }
  };
*/


/*
// --- 2. EXEMPLO DO BACKEND (Ex: server.js / Node.js + Express) ---

// "EU DO FUTURO": Isto é o que o meu developer de backend (ou eu)
// precisa de criar. Uma rota que recebe o CEP e o subtotal.

// (Isto é pseudocódigo, não pode ir para o React)

const express = require('express');
const fetch = require('node-fetch'); // 'fetch' no backend
const app = express();
app.use(express.json());

// REQUERIMENTO: POST /api/shipping/calculate
app.post('/api/shipping/calculate', async (req, res) => {
    try {
        const { cep, subtotal } = req.body;

        // 1. O Backend chama o ViaCEP (de forma segura)
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await viaCepResponse.json();

        if (data.erro) {
            return res.status(404).json({ message: 'CEP não encontrado.' });
        }

        // 2. O Backend corre a LÓGICA DE PREÇO (que antes estava no frontend)
        const estado = data.uf;
        let valorFrete = 0;
        let prazo = "3 a 5 dias úteis";

        // A lógica de preço agora está SEGURA no backend
        if (estado === 'SP') {
            valorFrete = 15.00;
            prazo = "2 a 3 dias úteis";
        } else if (['MG', 'RJ', 'PR', 'SC'].includes(estado)) {
            valorFrete = 25.00;
            prazo = "4 a 6 dias úteis";
        } else {
            valorFrete = 35.00;
            prazo = "5 a 10 dias úteis";
        }
        
        // (Lógica Bónus: Se o subtotal for > 200, frete é grátis)
        if (subtotal > 200) {
            valorFrete = 0;
            prazo = "Frete Grátis (2 a 5 dias)";
        }

        // 3. O Backend devolve o objeto 'frete' pronto para o frontend
        res.json({
            valor: valorFrete,
            prazo: prazo,
            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`
        });

    } catch (e) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// app.listen(5000, () => console.log('Servidor de frete a correr na porta 5000'));
*/