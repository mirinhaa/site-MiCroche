
// Esse ficheiro é o de produtos
// Este ficheiro é o meu "banco de dados falso" (mock).
// Quando eu integrar o backend, vou ter de apagar isto tudo e
// buscar os produtos de uma API. Por agora, isto serve para
// eu construir o layout do site.

import BolsaBranca1 from '../assets/bolsabranca1.PNG';
import BolsaBranca2 from '../assets/bolsabranca2.PNG';

import Conjunto1 from '../assets/conjunto1.jpg';
import Conjunto2 from '../assets/conjunto2.jpg';
import Conjunto3 from '../assets/conjunto3.PNG'; 

import Carregador1 from '../assets/carregadordecor1.jpg'; 

import Calopsita1 from '../assets/calopsita1.jpg';
import Calopsita2 from '../assets/calopsita2.jpg';
import Calopsita3 from '../assets/calopsita3.jpg';

import BolsaMarrom1 from '../assets/bolsamarrom1.JPG';
import BolsaMarrom2 from '../assets/bolsamarrom2.png';
import BolsaMarrom3 from '../assets/bolsamarrom3.png';

import Luffy1 from '../assets/luffy1.jpg';
import Luffy2 from '../assets/luffy2.jpg';
// Esta é a minha imagem "reserva" (fallback).
// Se um produto falhar a carregar a imagem, eu uso esta.
import placeholder from '../assets/mirinha.jpg';



// 2. O ARRAY PRINCIPAL DE PRODUTOS
// Aqui começa a minha lista de produtos.
const products = [
{
id: '1', // ID único (usei string, para ser fácil)
name: 'Bolsa de Crochê (Branca)',
price: 120.00, // Preço (usei número para ser fácil de calcular)
category: 'Bolsas', // Categoria (para filtros futuros)
description: 'Uma linda bolsa feita à mão com Barbante...',

 
images: [ // Um array com TODAS as imagens (para a galeria na página do produto)
BolsaBranca1, 
BolsaBranca2
],
mainImage: BolsaBranca1, // A imagem que aparece no card
stock: 10, // Quantos tenho em stock
rating: 4.8, // (Dados extra que posso usar no futuro)
reviews: 25
},
{
id: '2',
name: 'Conjunto de Crochê (Azul)',
price: 160.00,
category: 'Roupas',
description: 'Conjunto de crochê, ideal para festivais na praia.',
images: [
Conjunto1, 
Conjunto2, 
Conjunto3 
],
mainImage: Conjunto1,
stock: 15,
rating: 4.5,
reviews: 30
},
{
id: '3',
name: 'Carregador Decorado',
price: 100.00,
category: 'Decoração',
description: 'Carregador decorado em crocê ',
  images: [
  Carregador1 
],
mainImage: Carregador1, 
stock: 5,
rating: 4.9,
reviews: 12
},
{
id: '4',
name: 'Amigurumi (Calopsita)',
price: 45.00,
category: 'Amigurumis',
description: 'Chaveiro calopsita, perfeito para você presentear.',
images: [
 Calopsita1, 
 Calopsita2,
 Calopsita3 

],
 mainImage: Calopsita1, 
 stock: 50,
 rating: 4.7,
 reviews: 50
},
{
id: '5',
name: 'Bolsa de Crochê (Marrom)',
price: 180.00,
category: 'Bolsas',
description: 'Uma linda bolsa feita à mão com Barbante.',
images: [
 BolsaMarrom1, 
BolsaMarrom2, 
BolsaMarrom3 
],
 mainImage: BolsaMarrom1, 
 stock: 8,
 rating: 4.6,
 reviews: 18
},
{
 id: '6',
 name: 'Amigurumi (Luffy - One Piece)',
 price: 180.00,
 category: 'Amigurumis',
 description: 'Amigurumi do Luffy.',
 images: [
Luffy1, 
Luffy2 
],
mainImage: Luffy1, 
stock: 7,
rating: 5.0,
reviews: 10
}
]; // Fim do array 'products'


// 3. EXPORTS
// Exporto a imagem placeholder para usar noutros sítios (ex: ProductCard)
export const placeholderImage = placeholder;
// Exporto o array 'products' como 'default' (o principal deste ficheiro)
export default products;


/*

    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)

    Copiar e colear o código abaixo para substituir o "mock" de cima
    quando o seu backend estiver a funcionar.
    (Repare como os imports e o 'useState' mudam)

import React, { useState, useEffect } from 'react'; // <-- Precisa de useEffect
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import ProductCard from '../../components/ProductCard'; // <-- NOTA: Mude este caminho também se necessário

// --- VERSÃO "REAL" (BACKEND) ---

export default function ProductListPage() {
  // 1. O estado inicial agora é um array VAZIO
  const [allProducts, setAllProducts] = useState([]); 
  
  // 2. O carregamento começa como 'true'
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  // 3. O "CÓDIGO REAL": Usamos useEffect para buscar os dados da API
  //    assim que a página carregar.
  useEffect(() => {
    // Função assíncrona para buscar os produtos
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // REQUERIMENTO BACKEND: Rota GET /api/produtos
        // O seu backend tem de ter uma rota que devolve
        // o array de produtos (igual ao seu 'products.js').
        const response = await fetch('/api/produtos'); // <-- CHAMA O BACKEND

        if (!response.ok) {
          throw new Error('Não foi possível buscar os produtos.');
        }

        const data = await response.json();
        setAllProducts(data); // 4. Guarda os produtos reais no estado

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // 5. Termina o carregamento
      }
    };

    fetchProducts(); // Chama a função
  }, []); // O '[]' garante que isto só corre UMA VEZ


  // 6. Se houver um erro (agora é possível, ex: API offline)
  if (error) {
    return <Typography color="error">Erro ao carregar produtos: {error}</Typography>;
  }

  // 7. Se estiver a carregar (agora acontece mesmo)
  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  // 8. Mostra os produtos (este JSX é igual ao do "mock")
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nossos Produtos
      </Typography>
      <Grid container spacing={4}>
        {allProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

*/