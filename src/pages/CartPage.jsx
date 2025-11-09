import React, { useState } from 'react';
import { 
    Container, Typography, Box, Grid, List, ListItem, 
    ListItemText, Divider, Button, Paper, TextField, InputAdornment, 
    IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, removeFromCart, getTotalPrice } = useCart();
    const navigate = useNavigate();
    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Garante que o subtotal é sempre calculado
    const subtotal = getTotalPrice();

    const handleCheckout = () => {
        navigate('/checkout-process'); 
    };

    // Função para chamar a API ViaCEP
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
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError('CEP não encontrado. Tente outro.');
                return;
            }

            const estado = data.uf;
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
            
            setFrete({
                valor: valorFrete,
                prazo: prazo,
                endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`
            });

        } catch (e) {
            console.error("Erro na busca de CEP:", e);
            setError('Erro ao buscar o CEP. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const totalAPagar = frete ? subtotal + frete.valor : subtotal;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" color="primary.main" fontWeight={600}>
                Seu Carrinho de Compras
            </Typography>
            <Divider sx={{ mb: 4 }} />

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
                <Grid container spacing={4}>
                    {/* COLUNA ESQUERDA: ITENS DO CARRINHO */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <List>
                                {cartItems.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <ListItem 
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
                                                    e.target.src = "https://placehold.co/80x80/EDE7F6/9575CD?text=Mi";
                                                }}
                                            />
                                            <ListItemText
                                                primary={<Typography variant="h6">{item.name}</Typography>}
                                                secondary={
                                                    <Typography color="text.secondary">
                                                        {`Quantidade: ${item.quantity} | Preço Unitário: R$ ${parseFloat(item.price).toFixed(2)}`}
                                                    </Typography>
                                                }
                                            />
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

                    {/* COLUNA DIREITA: RESUMO E FRETE  */}
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

                            {/* SEÇÃO: CALCULAR FRETE */}
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
                                    onBlur={fetchCep} 
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
                            
                            {error && (
                                <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
                            )}

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
                            {/*  FIM DA SEÇÃO FRETE  */}

                            <Divider sx={{ my: 2 }} />

                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography variant="h5" fontWeight={700}>Total a Pagar:</Typography>
                                <Typography variant="h5" fontWeight={700} color="primary.dark">
                                    R$ {totalAPagar.toFixed(2)}
                                </Typography>
                            </Box>

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