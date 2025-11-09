import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    TextField, 
    Grid, 
    FormControlLabel, 
    Checkbox 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const navigate = useNavigate();
    
    // Estado para controlar os campos do formulário
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        saveCard: false,
    });

    // Handler para atualizar o estado
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handler para o envio do formulário (simulado)
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui, pode adicionar a lógica para enviar os dados para o backend
        console.log('Dados do Formulário:', formData);
        console.log('Pagamento processado (simulação)!'); 
        navigate('/'); 
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 3 }}
            >
                <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={600} sx={{ textAlign: 'center' }}>
                    Finalização do Pedido
                </Typography>
                
                {/* Secção de Endereço de Cobrança */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2,  }}>
                    Endereço de Cobrança
                </Typography>
                <Grid container spacing={4}>
                    {/* campos de endereço*/}
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Endereço (Linha 1)"
                            fullWidth
                            autoComplete="billing address-line1"
                            variant="outlined"
                            value={formData.address1}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Endereço (Linha 2) - Opcional"
                            fullWidth
                            autoComplete="billing address-line2"
                            variant="outlined"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="Cidade"
                            fullWidth
                            autoComplete="billing address-level2"
                            variant="outlined"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="Estado/Província"
                            fullWidth
                            variant="outlined"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="CEP / Código Postal"
                            fullWidth
                            autoComplete="billing postal-code"
                            variant="outlined"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="País"
                            fullWidth
                            autoComplete="billing country"
                            variant="outlined"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                {/* Secção de Detalhes do Pagamento */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, }}>
                    Detalhes do Pagamento
                </Typography>
                <Grid container spacing={4}>
                    {/* campos de pagamento */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            name="cardName"
                            label="Nome no Cartão"
                            fullWidth
                            autoComplete="cc-name"
                            variant="outlined"
                            value={formData.cardName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            name="cardNumber"
                            label="Número do Cartão"
                            fullWidth
                            autoComplete="cc-number"
                            variant="outlined"
                            value={formData.cardNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="expDate"
                            name="expDate"
                            label="Data de Validade (MM/AA)"
                            fullWidth
                            autoComplete="cc-exp"
                            variant="outlined"
                            placeholder="MM/AA"
                            value={formData.expDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            name="cvv"
                            label="CVV"
                            helperText="Os 3 ou 4 dígitos no verso do cartão"
                            fullWidth
                            autoComplete="cc-csc"
                            variant="outlined"
                            value={formData.cvv}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Centralizando o Checkbox */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    color="primary" 
                                    name="saveCard" 
                                    checked={formData.saveCard} 
                                    onChange={handleChange} 
                                />
                            }
                            label="Lembrar detalhes do cartão para a próxima compra"
                        />
                    </Grid>
                </Grid>
                
                {/* Botões de Ação */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => navigate('/')} // Ou navigate(-1) para voltar
                    >
                        Voltar
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        sx={{ py: 1.5, px: 4 }}
                    >
                        Pagar Agora
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}