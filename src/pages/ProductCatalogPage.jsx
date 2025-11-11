import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products'; 

export default function ProductCatalogPage() {
 
 const [searchTerm, setSearchTerm] = useState('');
 const [filter, setFilter] = useState('todos');

 const handleFilterChange = (event, newFilter) => {
 	if (newFilter !== null) {
 	  setFilter(newFilter);
 	}
 };
 
 const filteredProducts = productsData.filter(product => {
 	const matchesCategory = filter === 'todos' ? true : product.category.toLowerCase() === filter;
 	const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
 	return matchesCategory && matchesSearch;
 });

 return (
 	<Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f9f9f9' 
    }}>
 	  <Navbar />

 	  <Container maxWidth="lg" sx={{ py: 8 }}> 
 	  	  <Typography 
 	  	  	variant="h3" 
 	  	  	component="h1" 
 	  	  	gutterBottom 
 	  	  	sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
 	  	  >
 	  	  	Nosso Catálogo
 	  	  </Typography>

 	  	
 	  	  <Box sx={{ 
 	  	  	display: 'flex', 
 	  	  	justifyContent: 'space-between', 
 	  	  	alignItems: 'center', 
 	  	  	mb: 4, 
 	  	  	gap: 2,
 	  	  	flexDirection: { xs: 'column', md: 'row' }
 	  	  }}>
 	  	  	
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
 	  	  	<ToggleButton value="amigurumis" aria-label="amigurumi">Amigurumi</ToggleButton> 
 	  	  	</ToggleButtonGroup>
 	  	  </Box>


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
 	  

 	  <Footer />
 	</Box>
 );
}




/*
================================================================================
================================================================================
==
==    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)
==
==    "EU DO FUTURO": Este código substitui todo o ficheiro de cima.
==    A lógica de filtro (.filter()) desaparece do frontend e passa
==    para o backend.
==
==    Eu chamo a API (ex: /api/products?category=bolsas&search=branca)
==    e o backend é que me devolve a lista JÁ FILTRADA.
==
================================================================================
================================================================================
*/

/*
import React, { useState, useEffect } from 'react'; // "EU DO FUTURO": Preciso do useEffect
import { 
    Box, Container, Typography, Grid, TextField, 
    ToggleButtonGroup, ToggleButton, CircularProgress // "EU DO FUTURO": Preciso do CircularProgress
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
// "EU DO FUTURO": A linha 'import productsData' desaparece.

export default function ProductCatalogPage() {
 
  // "EU DO FUTURO": Os estados de filtro continuam iguais
 const [searchTerm, setSearchTerm] = useState('');
 const [filter, setFilter] = useState('todos');

  // "EU DO FUTURO": Criei estados para guardar os produtos que vêm da API
  // e para controlar o 'loading' e 'erro'
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // "EU DO FUTURO": Criei um estado para o "debounce" (atraso) da pesquisa.
  // Eu não quero chamar a API a cada letra que o utilizador digita,
  // só quando ele parar de digitar por 500ms.
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);


  // EFEITO 1: "DEBOUNCE" (Atraso na Pesquisa)
  // Este efeito "observa" o 'searchTerm'.
  useEffect(() => {
    // Eu crio um "alarme" (timeout) para 500ms no futuro
    const timerId = setTimeout(() => {
      // Quando o alarme tocar, eu atualizo o 'debouncedSearch'
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms = meio segundo

    // Se o utilizador digitar outra letra ANTES dos 500ms,
    // eu cancelo o alarme anterior e crio um novo.
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]); // Este efeito corre sempre que 'searchTerm' muda


  // EFEITO 2: BUSCAR NA API (O Efeito Principal)
  // Este efeito "observa" o 'filter' e o 'debouncedSearch'.
  // Ele corre quando o utilizador clica num filtro (imediato)
  // ou quando o "alarme" do debounce toca.
  useEffect(() => {
    // A função que realmente busca os dados
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // "EU DO FUTURO": Aqui eu construo a URL da API
        // REQUERIMENTO BACKEND: /api/products
        const params = new URLSearchParams();
        
        // Se o filtro não for 'todos', eu adiciono à URL
        // Ex: ?category=bolsas
        if (filter !== 'todos') {
          params.append('category', filter);
        }
        
        // Se a pesquisa (já com atraso) não for vazia, eu adiciono
        // Ex: ?category=bolsas&search=branca
        if (debouncedSearch) {
          params.append('search', debouncedSearch);
        }

        // Chamo o meu backend (que está em localhost:5001) com os filtros
        const response = await fetch(`http://localhost:5001/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Não foi possível buscar os produtos.');
        }
        
        const data = await response.json();
        setProducts(data); // Guardo os produtos (JÁ FILTRADOS) no estado

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Para o 'loading'
      }
    };

    fetchProducts(); // Chamo a função
  }, [filter, debouncedSearch]); // Dependências: filter E debouncedSearch


  // "EU DO FUTURO": A lógica 'const filteredProducts = ...' desapareceu!
  // O 'products' que vem do 'useState' já é a lista filtrada.

 const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
 };

 return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f9f9f9' 
    }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 8 }}> 
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
          >
            Nosso Catálogo
          </Typography>

        
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4, 
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            
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
            // "EU DO FUTURO": Desativei o 'disabled' no 'isLoading'
            // porque o 'debounce' já trata disso.
            />
            
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange} 
           aria-label="filtro de categoria"
              disabled={isLoading} // "EU DO FUTURO": Desativo os filtros enquanto carrega
              sx={{ 
                backgroundColor: 'white',
                width: { xs: '100%', md: 'auto' },
                flexWrap: 'wrap' 
              }}>
              <ToggleButton value="todos" aria-label="todos">Todos</ToggleButton>
         <ToggleButton value="bolsas" aria-label="bolsas">Bolsas</ToggleButton>
            <ToggleButton value="roupas" aria-label="roupas">Roupas</ToggleButton>
            <ToggleButton value="decoracao" aria-label="decoracao">Decoração</ToggleButton>
            <ToggleButton value="amigurumis" aria-label="amigurumi">Amigurumi</ToggleButton> 
            </ToggleButtonGroup>
          </Box>

        // "EU DO FUTURO": Adicionei a lógica de Loading / Erro
        {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
                <CircularProgress />
            </Box>
        ) : error ? (
            <Typography variant="h6" color="error" align="center" sx={{ mt: 10 }}>
                {error}
            </Typography>
        ) : (
            <React.Fragment>
                  <Grid container spacing={4} justifyContent="center">
                    {/* "EU DO FUTURO": Aqui eu faço o 'map' no estado 'products' (que veio da API) */
       // {products.map((product) => (
        // <Grid item key={product.id} xs={12} sm={6} md={4}>
        // <ProductCard product={product} />
       // </Grid>
      // ))}
        // </Grid>

                 // {/* "EU DO FUTURO": Mensagem de "nenhum produto"
                 //     (só aparece se NÃO estiver a carregar e se a API devolveu 0 produtos) */}
        // {products.length === 0 && !isLoading && (
        // <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 10 }}>
        //Nenhum produto encontrado com estes filtros.
        // </Typography> )}
         //   </React.Fragment>)}
//</Container>
//  <Footer />
//  </Box>
// );}*/