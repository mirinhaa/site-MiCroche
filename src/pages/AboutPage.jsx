import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Placeholder para as fotos das clientes
const customerPhotos = [
'https://www.google.com/search?q=https://placehold.co/300x300/008B8B/FFFFFF%3Ftext%3DCliente%2BFeliz%2B1',
'https://www.google.com/search?q=https://placehold.co/300x300/008B8B/FFFFFF%3Ftext%3DCliente%2BFeliz%2B2',
'https://www.google.com/search?q=https://placehold.co/300x300/008B8B/FFFFFF%3Ftext%3DCliente%2BFeliz%2B3',
];

export default function AboutPage() {
return (
<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
<Navbar />

  {/* 1. Secção Storytelling */}
  <Box sx={{ backgroundColor: 'white', py: 10, textAlign: 'center' }}>
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Feito à mão, com o coração
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 300, mb: 4 }}>
        A MiCroche nasceu da paixão de transformar fios em arte. 
        Cada peça é única, carregando horas de dedicação e 
        o objetivo de levar mais conforto e beleza para o seu dia a dia.
      </Typography>
    </Container>
  </Box>

  {/* 2. Secção Pedidos Personalizados */}
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Tem uma ideia única?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 3 }}>
          Nós adoramos desafios! Se você sonhou com uma peça de crochê que não
          encontra em lugar nenhum, fale connosco. 
          Fazemos pedidos personalizados, desde o tamanho até a cor e o material.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Fazer Orçamento
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box 
          component="img"
          src="https://placehold.co/600x400/008B8B/FFFFFF?text=Pedido+Personalizado"
          alt="Pedido Personalizado"
          sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
        />
      </Grid>
    </Grid>
  </Container>
  
  {/* 3. Secção Guia de Tamanhos*/}
  <Box sx={{ backgroundColor: 'white', py: 8 }}>
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
        Guia de Tamanhos (Exemplo de Tops)
      </Typography>
      <Paper sx={{ p: 2, overflowX: 'auto' }}>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {`P: Busto 80-88cm
          M: Busto 89-96cm
          G: Busto 97-105cm`}
</Typography>
</Paper>
</Container>
</Box>

  {/* 4. Secção Fotos de Clientes */}
  <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
      Nossas clientes
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {customerPhotos.map((photo, index) => (
        <Grid item key={index} xs={12} sm={4}>
          <Box 
            component="img"
            src={photo}
            alt={`Cliente MiCroche ${index + 1}`}
            sx={{ width: '100%', borderRadius: 4, boxShadow: 3, aspectRatio: '1 / 1' }}
          />
        </Grid>
      ))}
    </Grid>
  </Container>

  <Footer />
</Box>


);
}