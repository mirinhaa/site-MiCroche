import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importa o "cérebro"
import { placeholderImage } from '../data/products';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  const {
    id = 0,
    name = 'Produto de Exemplo',
    price = 'R$ 99,90',
    mainImage = placeholderImage 
 } = product || {};

  const handleCardClick = () => {
    navigate(`/produto/${id}`);
  };
  
  // Função para o botão "Comprar"
  const handleAddToCart = () => {
    // O 'product' que este componente recebeu
    addToCart(product); 
  };

  return (
 <Card sx={{ maxWidth: 345, borderRadius: 4, boxShadow: 3 }}>
   <CardActionArea onClick={handleCardClick}>
     <CardMedia
        component="img"
        height="200"
        image={mainImage} 
        alt={name} 
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage;}}
         />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
	  	  	{name}
	  	  </Typography>
 	  	  <Typography variant="body2" color="text.secondary">
	  	  	R$ {price.toFixed(2).replace('.', ',')}
 	  	  </Typography>
 	  	</CardContent>
 	  </CardActionArea>
 	  
 	  <CardActions>
 	  	<Button 
	  	  size="small" 
 	  	  color="primary" 
	  	  variant="contained" 
 	  	  onClick={handleAddToCart}
 	  	>
 	  	  Comprar
 	  	</Button>
 	  </CardActions>
 	</Card>
 );
}