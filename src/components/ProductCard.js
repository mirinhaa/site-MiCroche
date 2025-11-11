import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Importo o "cérebro" do meu carrinho (o Contexto) para poder adicionar itens.
// TENTATIVA 5: Voltando para '../' (um nível acima)
// Assumindo que este arquivo (ProductCard.jsx) está em 'src/components/'
// e 'context' está em 'src/context/'.
import { useCart } from '../context/CartContext';
// Importo a imagem placeholder, caso o produto venha sem imagem.
// TENTATIVA 5: Assumindo que 'data' está em 'src/data/'.
import { placeholderImage } from '../data/products';

// Defino meu componente ProductCard.
// Ele recebe um 'product' (o objeto do produto) como propriedade (prop).
export default function ProductCard({ product }) {
  // Inicializo o hook 'useNavigate' para que eu possa mudar de página
  // quando clicar no card.
  const navigate = useNavigate();
  // Pego a função 'addToCart' lá do meu 'CartContext'.
  const { addToCart } = useCart();

  // Aqui eu "desconstruo" o objeto 'product' que recebi.
  // Eu também defino valores padrão (placeholders) para cada campo.
  // Isso é uma medida de segurança para o código não quebrar
  // se o 'product' vier 'null' ou se faltar alguma propriedade.
  const {
    id = 0, // Se não tiver id, usa 0.
    name = 'Produto de Exemplo', // Se não tiver nome, usa este.
    price = 'R$ 99,90', // Se não tiver preço, usa este. (NOTA: Isso é uma string!)
    mainImage = placeholderImage // Se não tiver imagem, usa minha imagem placeholder.
  } = product || {}; // O '|| {}' é o truque final de segurança se 'product' for undefined.

  // Esta função vai rodar quando eu clicar em qualquer lugar da área clicável do card.
  const handleCardClick = () => {
    // Eu uso o 'navigate' para ir para a página de detalhes do produto,
    // usando o 'id' do produto para montar a URL.
    navigate(`/produto/${id}`);
  };

  // Esta função roda *apenas* quando eu clico no botão "Comprar".
  const handleAddToCart = () => {
    // Eu chamo a função 'addToCart' (que veio do Contexto)
    // e passo o objeto 'product' inteiro para ela.
    // O Contexto vai se encarregar da lógica de adicionar.
    addToCart(product);
  };

  // Esta parte é o JSX, o que realmente vai aparecer na tela.
  return (
    // 'Card' é o container principal. Coloquei bordas e sombra.
    <Card sx={{ maxWidth: 345, borderRadius: 4, boxShadow: 3 }}>
      {/* 'CardActionArea' faz a maior parte do card ser clicável. */}
      <CardActionArea onClick={handleCardClick}>
        {/* 'CardMedia' é onde eu coloco a imagem do produto. */}
        <CardMedia
          component="img"
          height="200"
          image={mainImage} // Uso a imagem do produto (ou o placeholder).
          alt={name} // Texto alternativo para acessibilidade.
          // Este 'onError' é um truque de segurança: se a URL da imagem falhar,
          // eu troco ela pelo placeholder para não mostrar um ícone quebrado.
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage;}}
        />
        {/* 'CardContent' é onde vão os textos (nome e preço). */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* Exibo o nome do produto. */}
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
         
        
            R$ {price.toFixed(2).replace('.', ',')}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* 'CardActions' é a área dos botões, fora da parte clicável. */}
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          // Ligo esta função específica ao botão.
          onClick={handleAddToCart}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
}