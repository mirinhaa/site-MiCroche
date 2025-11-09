import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Importa os dados falsos
import { mockProducts } from '../mockData';

export default function ProductCatalogPage() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };
  
  // Lógica de Filtragem
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = filter === 'todos' ? true : product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
          >
            Nosso Catálogo
          </Typography>

        
          {/* Esee é o Box 'pai' que segura a barra de pesquisa e os botões */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4, 
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            
            {/* A BARRA DE PESQUISA */}
            <TextField 
              variant="outlined" 
              label="Pesquisar por nome..." 
              sx={{ 
                flexGrow: 1, 
                minWidth: '200px', 
                backgroundColor: 'white',
                width: { xs: '100%', md: 'auto' }
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* OS BOTÕES DE FILTRO */}
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange} 
              aria-label="filtro de categoria"
              sx={{ 
                backgroundColor: 'white',
                width: { xs: '100%', md: 'auto' },
                flexWrap: 'wrap' 
              }}
            >
              <ToggleButton value="todos" aria-label="todos">Todos</ToggleButton>
              <ToggleButton value="bolsas" aria-label="bolsas">Bolsas</ToggleButton>
              <ToggleButton value="roupas" aria-label="roupas">Roupas</ToggleButton>
              <ToggleButton value="decoracao" aria-label="decoracao">Decoração</ToggleButton>
              <ToggleButton value="amigurumi" aria-label="amigurumi">Amigurumi</ToggleButton>
             
            </ToggleButtonGroup>
          </Box>


          {/* Grelha de Produtos*/}
          <Grid container spacing={4} justifyContent="center">
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
            
            {filteredProducts.length === 0 && (
              <Typography variant="h6" color="text.secondary" sx={{ mt: 10 }}>
                Nenhum produto encontrado com estes filtros.
              </Typography>
            )}
            
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}