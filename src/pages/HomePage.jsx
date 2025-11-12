import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import productsData from '../data/products';

// Estilo reutilizável para aplicar o efeito hover em todos os textos (Typography)
const hoverTextStyle = {
  cursor: 'pointer', // Cursor muda para indicar que o texto é interativo
  transition: 'color 0.3s ease', // Transição suave para mudança de cor
  '&:hover': {
    color: 'primary.main', // Cor primária definida no tema Material UI ao passar o mouse
  },
};


const featuredProducts = productsData.slice(0, 3);

export default function HomePage() {
     return (

 <Box sx={{ 
 display: 'flex', 
 flexDirection: 'column', 
 minHeight: '100vh',
 backgroundColor: '#f9f9f9' 
 }}>


<Navbar />



 {/* SECÇÃO HERO (Boas-vindas) */}
 <Box 
 sx={{ 
 	backgroundColor: 'white', 
	py: 10, 
 	textAlign: 'center',
 	borderBottom: 1,
 	borderColor: 'grey.300'
 }}>

 {/* SECÇÃO HERO (Boas-vindas) */}
 <Box 
 sx={{ 
	backgroundColor: 'white', 
 	py: 1, 
 	textAlign: 'center',
 	borderBottom: 1,
 	borderColor: 'grey.300'
 }}
 >
 	  	<Container maxWidth="md">
	  	  <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700,...hoverTextStyle }}>
	  	  	Aconchego em cada ponto
 	  	  </Typography>
	  	  <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 250,...hoverTextStyle }}>
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
 	  	  sx={{ textAlign: 'center', fontWeight: 700, mb: 6,...hoverTextStyle }}
 	  	>
 	  	  Nossos Destaques
 	  	</Typography>
 	  	<Grid container spacing={4} justifyContent="center">
 	  	  {featuredProducts.map((product) => (
 	  	  	<Grid item key={product.id} xs={12} sm={6} md={4}>
 	  	  	  <ProductCard product={product} />
 	  	  	</Grid>
 	  	  ))}
 	  	</Grid>
 	  </Container>

 	  {/* SECÇÃO SOBRE (Storytelling) */}
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
 	  	  	sx={{ fontWeight: 700, mb: 4,...hoverTextStyle }}
 	  	  >
 	  	  	Feito à mão, com o coração
 	  	  </Typography>
 	  	  <Typography 
 	  	  	variant="body1" 
 	  	  	color="text.secondary" 
 	  	  	sx={{ fontSize: '1.1rem', mb: 4,...hoverTextStyle }}
 	  	  >
 	  	  	A MiCroche nasceu da paixão de transformar fios em arte...
 	  	  </Typography>
 	  	  <Box>
 	  	  	<IconButton 
 	  	  	  aria-label="Instagram" 
 	  	  	  color="primary" 
 	  	  	  href="https://www.instagram.com/_microche?igsh=eWt3ZWR2ZDY0YWg0&utm_source=qr"
 	  	  	  target="_blank"
	  	  	>
	  	  	  <InstagramIcon sx={{ fontSize: 55 }} />
 	  	  	</IconButton>
 	  	  	<IconButton 
 	  	  	  aria-label="WhatsApp" 
 	  	  	  color="primary" 
 	  	  	  href="http://wa.me/5583986766302"
 	  	  	  target="_blank"
 	  	  	>
 	  	  	  <WhatsAppIcon sx={{ fontSize: 55 }} />
	  	  	</IconButton>
 	  	  </Box>
 	  	</Container>
 	  </Box>
 	</Box>
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
==    "EU DO FUTURO": Quando o meu backend estiver a correr
==    (em http://localhost:5001), eu substituo TODO o código
==    deste ficheiro (acima) por este código (abaixo).
==
==    Este código "real" usa 'useState' e 'useEffect' para
==    buscar ('fetch') os produtos da minha API em vez de
==    importar 'productsData.js'.
==
================================================================================
================================================================================
*/

/*
import React, { useState, useEffect } from 'react'; // "EU DO FUTURO": Preciso do useState e useEffect
import { Box, Container, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// "EU DO FUTURO": A linha 'import productsData' desaparece

export default function HomePage() {
  
  // "EU DO FUTURO": Criei estados para guardar os produtos que vêm da API
  // e para controlar o 'loading' e 'erro'
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hoverTextStyle = {
  cursor: 'pointer', // Cursor muda para indicar que o texto é interativo
  transition: 'color 0.3s ease', // Transição suave para mudança de cor
  '&:hover': {
    color: 'primary.main', // Cor primária definida no tema Material UI ao passar o mouse
  },
};
  

  // "EU DO FUTURO": Este 'useEffect' corre UMA VEZ
  // quando a página carrega (por causa do '[]' no fim)
  useEffect(() => {
    // Defino a função que vai buscar os dados
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true); // Começa o 'loading'
        setError(null); // Limpa erros antigos

        // Chamo a ROTA que criei no meu backend
        // (O backend está em localhost:5001 e o frontend em localhost:3000)
        const response = await fetch('http://localhost:5001/api/products/featured');
        
        if (!response.ok) {
          throw new Error('Não foi possível buscar os produtos em destaque.');
        }
        
        const data = await response.json();
        setFeaturedProducts(data); // Guardo os produtos no estado
      
      } catch (err) {
        setError(err.message); // Guardo o erro
      
      } finally {
        setIsLoading(false); // Paro o 'loading' (com sucesso OU erro)
      }
    };

    fetchFeaturedProducts(); // Chamo a função
  }, []); // O '[]' garante que isto só corre uma vez


  return (
 <Box sx={{ 
 display: 'flex', 
 flexDirection: 'column', 
 minHeight: '100vh',
 backgroundColor: '#f9f9f9' 
 }}>

  <Navbar />
  
  // SECÇÃO HERO (Boas-vindas)
  // Esta parte não muda, é estática
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
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600,...hoverTextStyle }}>
            Aconchego em cada ponto
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 250,...hoverTextStyle }}>
            Peças artesanais de crochê feitas com carinho,
            exclusivamente para você.
          </Typography>
        </Container>
      </Box>

      // SECÇÃO DESTAQUES (MODIFICADA)
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ textAlign: 'center', fontWeight: 700, mb: 6 }}
        >
          Nossos Destaques
        </Typography>

        // "EU DO FUTURO": Adicionei lógica de Loading e Erro
        {isLoading ? (
          // Se está a carregar, mostro um spinner
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          // Se deu erro, mostro a mensagem de erro
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          // Se não deu erro E não está a carregar, mostro os produtos
          <Grid container spacing={4} justifyContent="center">
              {featuredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  // O 'ProductCard' agora recebe o 'product' que veio da API
                  // (com 'mainImage' a ser um URL, o que é perfeito)
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
        )}
      </Container>

      // SECÇÃO SOBRE (Storytelling)
      // Esta parte não muda, é estática
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
            sx={{ fontWeight: 700, mb: 4,...hoverTextStyle }}
          >
            Feito à mão, com o coração
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ fontSize: '1.1rem', mb: 4,...hoverTextStyle }}
          >
            A MiCroche nasceu da paixão de transformar fios em arte...
       </Typography>
          <Box>
            <IconButton 
              aria-label="Instagram" 
              color="primary" 
              href="https://www.instagram.com/_microche?igsh=eWt3ZWR2ZDY0YWg0&utm_source=qr"
              target="_blank"
            >
              <InstagramIcon sx={{ fontSize: 55 }} />
         </IconButton>
            <IconButton 
              aria-label="WhatsApp" 
              color="primary" 
              href="http://wa.me/5583986766302"
              target="_blank"
            >
              <WhatsAppIcon sx={{ fontSize: 55 }} />
      </IconButton>
          </Box>
        </Container>
      </Box>
    
    <Footer />
 </Box>
 );
}
*/