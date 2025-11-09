import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';

// Importa os Componentes
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Importa os ícones para as redes sociais
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

// DADOS FALSOS (Mock Data)
const mockProducts = [
  {
    id: 1,
    name: 'Bolsa de Crochê (Verde)',
    price: 'R$ 120,00',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Bolsa+MiCroche'
  },
  {
    id: 2,
    name: 'Top de Crochê (Branco)',
    price: 'R$ 89,90',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Top+MiCroche'
  },
  {
    id: 3,
    name: 'Manta de Crochê (Bege)',
    price: 'R$ 250,00',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Manta+MiCroche'
  },
];

export default function HomePage() {
  return (
  
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f9f9f9' 
    }}>
      
      {/* 1. BARRA DE NAVEGAÇÃO */}
      <Navbar />

      {/* Define o conteúdo principal da página */}
      <Box component="main" sx={{ flexGrow: 1 }}>

        {/* SECÇÃO HERO (Boas-vindas) */}
        <Box 
          sx={{ 
            backgroundColor: 'white', 
            py: 10, 
            textAlign: 'center',
            borderBottom: 1,
            borderColor: 'grey.300'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Aconchego em cada ponto
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 300 }}>
              Peças artesanais de crochê feitas com carinho,
              exclusivamente para você.
            </Typography>
          </Container>
        </Box>

        {/* SECÇÃO DESTAQUES */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 700, 
              mb: 6 // margem em baixo
            }}
          >
            Nossos Destaques
          </Typography>

          {/* Grid que segura os cartões de produto */}
          <Grid container spacing={4} justifyContent="center">
          
            {mockProducts.map((product) => (
              
              // 'xs={12}' = 1 coluna em mobile
              // 'sm={6}' = 2 colunas em tablet
              // 'md={4}' = 3 colunas em desktop
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
              
            ))}
          </Grid>
        </Container>

        {/* SECÇÃO SOBRE (Storytelling)  */}
        <Box 
          sx={{ 
            backgroundColor: 'white', 
            py: 8, 
            textAlign: 'center',
            borderTop: 1,
            borderColor: 'grey.300'
          }}
        >
          <Container maxWidth="md">
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ fontWeight: 700, mb: 4 }}
            >
              Feito à mão, com o coração
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ fontSize: '1.1rem', mb: 4 }}
            >
              A MiCroche nasceu da paixão de transformar fios em arte. 
              Cada peça é única, carregando horas de dedicação e 
              o objetivo de levar mais conforto e beleza para o seu dia a dia.
              Nós acreditamos no poder do artesanal.
            </Typography>

            {/* Links de Redes Sociais */}
            <Box>
              <IconButton 
                aria-label="Instagram" 
                color="primary" 
                href="https://www.instagram.com/_microche?igsh=eWt3ZWR2ZDY0YWg0&utm_source=qr"
                target="_blank"
              >
                <InstagramIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton 
                aria-label="WhatsApp" 
                color="primary" 
                href="http://wa.me/5583986766302"
                target="_blank"
              >
                <WhatsAppIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton 
                aria-label="Email" 
                color="primary" 
                href="microche03@gmail.com"
              >
                <EmailIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Container>
        </Box>

      </Box>

      {/* 3. RODAPÉ */}
      <Footer />
      
    </Box>
  );
}