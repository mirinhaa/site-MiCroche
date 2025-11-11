import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import Navbar from '../components/Navbar';  // Barra de navegação no topo da página
import Footer from '../components/Footer';  // Rodapé da página
import mirinha from '../assets/mirinha.jpg'; // Imagem usada na seção de pedidos personalizados
import VestidoAzul from '../assets/vestidoazul1.png'; // Foto de cliente usada na galeria
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'; // Componentes de tabela do Material UI

// Array placeholder com as URLs ou imports das fotos das clientes para exibir na seção 4
const customerPhotos = [
  'assets/vestidoazul1.png',
];

// Estilo reutilizável para aplicar o efeito hover em todos os textos (Typography)
const hoverTextStyle = {
  cursor: 'pointer', // Cursor muda para indicar que o texto é interativo
  transition: 'color 0.3s ease', // Transição suave para mudança de cor
  '&:hover': {
    color: 'primary.main', // Cor primária definida no tema Material UI ao passar o mouse
  },
};

export default function AboutPage() {
  return (
    // Container principal da página com flexbox para organizar navbar, conteúdo e footer em coluna
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* Navbar fixada no topo */}
      <Navbar />

      {/* 1. Seção Storytelling: apresenta a missão/visão da marca */}
      <Box sx={{ backgroundColor: 'white', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, ...hoverTextStyle }} // Aplica o estilo hover
          >
            Feito à mão, com o coração
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: 300, mb: 4, ...hoverTextStyle }} // Aplica o estilo hover
          >
            A MiCroche nasceu da paixão de transformar fios em arte. 
            Cada peça é única, carregando horas de dedicação e 
            o objetivo de levar mais conforto e beleza para o seu dia a dia.
          </Typography>
        </Container>
      </Box>

      {/* 2. Seção Pedidos Personalizados: apresenta o serviço e o botão para contato */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center" textAlign="center">

          {/* Texto explicativo e botão */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, ...hoverTextStyle }} // Hover no título
            >
              Tem uma ideia única?
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', mb: 3, ...hoverTextStyle }} // Hover no parágrafo
            >
              Nós adoramos desafios! Se você sonhou com uma peça de crochê que não
              encontra em lugar nenhum, fale conosco.
              Fazemos pedidos personalizados, desde o tamanho até a cor e o material.
            </Typography>

            {/* Botão centralizado para WhatsApp */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "15vh",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                component="a"
                href="http://wa.me/5583986766302" // Link para contato via WhatsApp
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: "250px",
                  height: "70px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "30px"
                }}
              >
                Fazer Orçamento
              </Button>
            </Box>
          </Grid>

          {/* Imagem ilustrativa ao lado do texto */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={mirinha}
              alt="Pedido Personalizado"
              sx={{
                width: '30%',
                borderRadius: 100,
                boxShadow: 3,
                display: 'block',
                margin: '0 auto',
                 animation: 'zoomAnimation 6s ease-in-out infinite',
    '@keyframes zoomAnimation': {
      '0%, 100%': {
        transform: 'scale(1)',  // tamanho normal
      },
      '50%': {
        transform: 'scale(1.1)', // cresce 10%
      },
    },
  
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 3. Seção Guia de Tamanhos: tabela para ajudar os clientes a escolher o tamanho correto */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: 'center', mb: 4, ...hoverTextStyle }} // Hover no título
          >
            Guia de Tamanhos para Roupas
          </Typography>

          {/* Tabela com medidas */}
          <Paper sx={{ p: 2 }}>
            <Table sx={{ minWidth: 400 }} aria-label="guia de tamanhos">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tamanho</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Numeração</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tórax (cm)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cintura (cm)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quadril (cm)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Dados da tabela mapeados para facilitar manutenção */}
                {[
                  ['PP', '36', '82–86', '68–72', '86–90'],
                  ['P', '38–40', '88–94', '74–80', '92–98'],
                  ['M', '42–44', '96–102', '82–88', '100–106'],
                  ['G', '46–48', '104–110', '90–96', '108–114'],
                  ['GG', '50–52', '112–118', '98–104', '116–122']
                ].map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell align="center" key={j}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>

      {/* 4. Seção Fotos de Clientes: galeria com fotos para mostrar trabalhos feitos */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6, ...hoverTextStyle }} // Hover no título
        >
          Nossas clientes
        </Typography>

        {/* Grid para organizar as fotos das clientes em colunas responsivas */}
        <Grid container spacing={2} justifyContent="center">
          {customerPhotos.map((photo, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Box
                component="img"
                src={VestidoAzul} // Aqui pode substituir por photo para usar o array
                alt={`Cliente MiCroche ${index + 1}`}
                sx={{ width: '20%', borderRadius: 100, boxShadow: 3, aspectRatio: '1 / 1' }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer fixado na parte inferior da página */}
      <Footer />
    </Box>
  );
}
