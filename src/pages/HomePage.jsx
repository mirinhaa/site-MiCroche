import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import productsData from '../data/products';

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
	  	  <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
	  	  	Aconchego em cada ponto
 	  	  </Typography>
	  	  <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 250 }}>
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
 	  	  sx={{ textAlign: 'center', fontWeight: 700, mb: 6 }}
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
 	  	  	sx={{ fontWeight: 700, mb: 4 }}
 	  	  >
 	  	  	Feito à mão, com o coração
 	  	  </Typography>
 	  	  <Typography 
 	  	  	variant="body1" 
 	  	  	color="text.secondary" 
 	  	  	sx={{ fontSize: '1.1rem', mb: 4 }}
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