import React, { useState } from 'react'; 
import { 
  Container, Typography, Box, Button, TextField, Grid, FormControlLabel, Checkbox, Paper,  
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();

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

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enviar os dados para backend no futuro
    console.log('Dados do Formulário:', formData);
    console.log('Pagamento processado (simulação)!');
    navigate('/');
  };

  return (
    // Box para controlar o fundo da página
    <Box 
      sx={{ 
        backgroundColor: 'primary.main',  // cor de fundo primária
        minHeight: '100vh',               // altura mínima da tela toda
        py: 8                            // padding vertical para espaçamento
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            color="primary.main" 
            fontWeight={700} 
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Finalização do Pedido
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Seção Endereço de Cobrança */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3, borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}>
              Endereço de Cobrança
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address1"
                  name="address1"
                  label="Endereço (Linha 1)"
                  variant="outlined"
                  value={formData.address1}
                  onChange={handleChange}
                  autoComplete="billing address-line1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address2"
                  name="address2"
                  label="Endereço (Linha 2) - Opcional"
                  variant="outlined"
                  value={formData.address2}
                  onChange={handleChange}
                  autoComplete="billing address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="Cidade"
                  variant="outlined"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  name="state"
                  label="Estado/Província"
                  variant="outlined"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zip"
                  name="zip"
                  label="CEP / Código Postal"
                  variant="outlined"
                  value={formData.zip}
                  onChange={handleChange}
                  autoComplete="billing postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  name="country"
                  label="País"
                  variant="outlined"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="billing country"
                />
              </Grid>
            </Grid>

            {/* Seção Detalhes do Pagamento */}
            <Typography variant="h6" fontWeight={600} sx={{ mt: 5, mb: 3, borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}>
              Detalhes do Pagamento
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cardName"
                  name="cardName"
                  label="Nome no Cartão"
                  variant="outlined"
                  value={formData.cardName}
                  onChange={handleChange}
                  autoComplete="cc-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cardNumber"
                  name="cardNumber"
                  label="Número do Cartão"
                  variant="outlined"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  autoComplete="cc-number"
                  inputProps={{ maxLength: 19 }} // Limita caracteres para número de cartão
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="expDate"
                  name="expDate"
                  label="Validade (MM/AA)"
                  variant="outlined"
                  placeholder="MM/AA"
                  value={formData.expDate}
                  onChange={handleChange}
                  autoComplete="cc-exp"
                  inputProps={{ maxLength: 5 }} // Limita o formato MM/AA
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  variant="outlined"
                  helperText="3 ou 4 dígitos"
                  value={formData.cvv}
                  onChange={handleChange}
                  autoComplete="cc-csc"
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
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

            {/* Botões de ação */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ minWidth: 120 }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ minWidth: 120, px: 4 }}
              >
                Pagar Agora
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
