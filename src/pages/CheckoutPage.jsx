import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Box sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={600}>
                    Finalização do Pedido
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Esta é a página de checkout. Aqui você integraria a lógica de pagamento real (Stripe, PagSeguro, etc.).
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 4, color: 'text.primary' }}>
                    Processo de pagamento simulado!
                </Typography>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 4, py: 1.5, px: 4 }}
                    onClick={() => navigate('/')}
                >
                    Voltar para a Home
                </Button>
            </Box>
        </Container>
    );
}