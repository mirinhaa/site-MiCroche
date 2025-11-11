import React, { useState, useEffect } from 'react';
import { 
    Container, Grid, Box, Typography, Button, Divider, Rating,
    ToggleButton, ToggleButtonGroup, 
    Snackbar, Alert, TextField,
    useMediaQuery, useTheme,
    Modal,
    Fade,
    Backdrop,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products';

// Estilo para o Modal de Zoom
const zoomModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0.5, 
  outline: 'none',
  borderRadius: 2,
};


export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Estado para controlar o Modal de Zoom
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
    } else {
      navigate('/produtos');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setOpenSnackbar(true); 
      setTimeout(() => {
        navigate('/carrinho'); 
      }, 3000); 
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Funções para controlar o Zoom
  const handleOpenZoomModal = () => setIsZoomModalOpen(true);
  const handleCloseZoomModal = () => setIsZoomModalOpen(false);


  if (!product) {
    return <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>Carregando produto...</Typography>;
  }

  return (
    
    //Container QUE FAZ A CENTRALIZAÇÃO 
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        variant="outlined" 
        sx={{ mb: 3 }} 
        onClick={() => navigate('/produtos')}
      >
        ← Voltar para o Catálogo
      </Button>

      <Grid container spacing={4}>
        {/*COLUNA ESQUERDA: IMAGENS DO PRODUTO*/}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            width: '100%', 
            pb: isMobile ? '75%' : '100%', 
            position: 'relative',
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 2,
            boxShadow: 3
          }}>
            <Box 
              component="img"
              src={selectedImage}
              alt={product.name}
              onClick={handleOpenZoomModal}
              sx={{ 
                position: 'absolute', 
                top: 0, left: 0, width: '100%', height: '100%', 
                objectFit: 'cover',
                cursor: 'zoom-in'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x600/EDE7F6/9575CD?text=MiCroche';
              }}
            />
          </Box>
          
          {/* Miniaturas das imagens */}
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, justifyContent: isMobile ? 'flex-start' : 'center' }}>
            {product.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`${product.name} - imagem ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                sx={{
                  width: 80, 
                  height: 80, 
                  objectFit: 'cover', 
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: img === selectedImage ? '3px solid' : '1px solid',
                  borderColor: img === selectedImage ? 'primary.main' : 'grey.300',
                  '&:hover': { borderColor: 'primary.light' }
                }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/80x80/EDE7F6/9575CD?text=Mi';
                }}
              />
            ))}
          </Box>
        </Grid>

        {/*COLUNA DIREITA: DETALHES E AÇÃO*/}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={700}>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews} avaliações)
            </Typography>
          </Box>

          <Typography variant="h3" color="primary.dark" sx={{ my: 2, fontWeight: 'bold' }}>
            R$ {product.price.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {product.description}
          </Typography>

          <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'} sx={{ mb: 3, fontWeight: 'bold' }}>
            {product.stock > 0 ? `Em estoque: ${product.stock} unidades` : 'Fora de estoque'}
          </Typography>

          {/* Seção de Quantidade */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Quantidade:</Typography>
            <ToggleButtonGroup
              value={quantity}
              exclusive
              onChange={(event, newQuantity) => {
                if (newQuantity !== null) {
                    setQuantity(newQuantity);
                }
              }}
              aria-label="quantidade do produto"
              size="small"
            >
              <ToggleButton value={1}>1</ToggleButton>
              <ToggleButton value={2}>2</ToggleButton>
              <ToggleButton value={3}>3</ToggleButton>
              <ToggleButton value={4}>4</ToggleButton>
              <ToggleButton value={5}>5</ToggleButton>
            </ToggleButtonGroup>
             <TextField
                type="number"
                value={quantity}
                onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                    setQuantity(value);
                }}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 80, ml: 2 }}
                size="small"
            />
          </Box>


          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            sx={{ py: 1.5, mt: 2 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Adicionar ao Carrinho e Finalizar Compra
          </Button>
          
          {product.stock === 0 && (
            <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
              Este produto está temporariamente fora de estoque.
            </Typography>
          )}
        </Grid>
      </Grid>
      
      {/* SNACKBAR DE CONFIRMAÇÃO */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {quantity}x {product.name} adicionado(s) ao carrinho! Redirecionando...
        </Alert>
      </Snackbar>

      {/* O MODAL DE ZOOM DA IMAGEM*/}
      <Modal
        aria-labelledby="imagem-produto-zoom"
        aria-describedby="imagem-grande-do-produto"
        open={isZoomModalOpen}
        onClose={handleCloseZoomModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isZoomModalOpen}>
          <Box sx={zoomModalStyle}>
            {/* Botão de Fechar o Zoom */}
            <IconButton
              aria-label="fechar zoom"
              onClick={handleCloseZoomModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10, 
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            {/* A Imagem em si */}
            <img
              src={selectedImage}
              alt={product.name}
              style={{ 
                width: '100%', 
                height: 'auto', // Altura automática
                maxHeight: '90vh', // Limite da altura da tela
                objectFit: 'contain', // Garante que a imagem inteira aparece
                borderRadius: '8px' // Borda arredondada
              }}
            />
          </Box>
        </Fade>
      </Modal>

    </Container>
  );
}


/*
================================================================================
================================================================================
==
==    CÓDIGO REAL DO BACKEND (PARA QUANDO ESTIVER PRONTO)
==
==    "EU DO FUTURO": Este código substitui todo o ficheiro de cima.
==    A lógica do 'useEffect' muda: em vez de procurar num array local,
==    ele vai fazer 'fetch' ao meu backend para buscar UM produto.
==    (REQUERIMENTO: GET /api/products/:id)
==
================================================================================
================================================================================
*/

/*
import React, { useState, useEffect } from 'react';
import { 
    Container, Grid, Box, Typography, Button, Divider, Rating,
    ToggleButton, ToggleButtonGroup, 
    Snackbar, Alert, TextField,
    useMediaQuery, useTheme,
    Modal,
    Fade,
    Backdrop,
    IconButton,
    CircularProgress // "EU DO FUTURO": Importei o 'loading'
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// "EU DO FUTURO": A linha 'import productsData' desaparece.

// O Estilo do Modal (não muda)
const zoomModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0.5, 
  outline: 'none',
  borderRadius: 2,
};


export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // "EU DO FUTURO": Adicionei 'isLoading' e 'error'
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  // --- "EU DO FUTURO": ESTE É O NOVO 'useEffect' (REAL) ---
  useEffect(() => {
    // Crio a função 'async' para buscar o produto
    const fetchProduct = async () => {
      setIsLoading(true); // Começa o 'loading'
      setError(null);

      try {
        // Chamo o meu backend (que está em localhost:5001)
        // REQUERIMENTO: GET /api/products/:id
        const response = await fetch(`http://localhost:5001/api/products/${id}`);

        if (!response.ok) {
          // Se a resposta for 404 (Não Encontrado) ou 500, dá erro
          throw new Error('Produto não encontrado.');
        }

        const data = await response.json();
        setProduct(data); // Guardo o produto que veio da API
        setSelectedImage(data.images[0]); // Defino a imagem principal

      } catch (err) {
        setError(err.message); // Guardo a mensagem de erro
        // "EU DO FUTURO": Se der erro, eu espero 3s e
        // mando o utilizador de volta ao catálogo.
        setTimeout(() => {
          navigate('/produtos');
        }, 3000);
      } finally {
        setIsLoading(false); // Para o 'loading' (com sucesso ou erro)
      }
    };

    fetchProduct(); // Chamo a função
  }, [id, navigate]); // Dependências: id e navigate

  const handleAddToCart = () => {
    // "EU DO FUTURO": Esta função não muda. A lógica dela
    // (chamar o 'CartContext') já está pronta para o backend.
    if (product) {
      addToCart(product, quantity);
      setOpenSnackbar(true); 
      setTimeout(() => {
        navigate('/carrinho'); 
      }, 3000); 
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenZoomModal = () => setIsZoomModalOpen(true);
  const handleCloseZoomModal = () => setIsZoomModalOpen(false);


  // --- "EU DO FUTURO": NOVA LÓGICA DE LOADING E ERRO ---
  if (isLoading) {
    // Se 'isLoading' é true, mostro um spinner
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 2 }}>
            <CircularProgress />
            <Typography variant="h5" color="text.secondary">
                Carregando produto...
            </Typography>
        </Box>
    );
  }

  if (error) {
    // Se 'error' não é nulo, mostro o erro
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 2 }}>
            <Typography variant="h5" color="error">
                Erro: {error} Você será redirecionado...
            </Typography>
        </Box>
    );
  }

  if (!product) {
    // Se o 'loading' acabou, não deu erro, mas o produto AINDA é nulo
    // (Isto é uma segurança extra, não devia acontecer se o 'error' funcionar bem)
    return <Typography>Produto não encontrado.</Typography>;
  }
  // --- FIM DA NOVA LÓGICA ---


  // "EU DO FUTURO": Se passou por tudo, 'product' existe. Mostro a página:
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        variant="outlined" 
        sx={{ mb: 3 }} 
        onClick={() => navigate('/produtos')}
      >
        ← Voltar para o Catálogo
      </Button>

      <Grid container spacing={4}>
        // COLUNA ESQUERDA: IMAGENS DO PRODUTO
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            width: '100%', 
            pb: isMobile ? '75%' : '100%', 
            position: 'relative',
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 2,
            boxShadow: 3
          }}>
            <Box 
              component="img"
              // "EU DO FUTURO": Agora 'selectedImage' é um URL (http://...)
              // que veio do meu backend.
              src={selectedImage}
              alt={product.name}
              onClick={handleOpenZoomModal}
              sx={{ 
                position: 'absolute', 
                top: 0, left: 0, width: '100%', height: '100%', 
                objectFit: 'cover',
                cursor: 'zoom-in'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x600/EDE7F6/9575CD?text=MiCroche';
              }}
            />
          </Box>
          
          // Miniaturas das imagens
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, justifyContent: isMobile ? 'flex-start' : 'center' }}>
            {product.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img} // "EU DO FUTURO": 'img' também é um URL
                alt={`${product.name} - imagem ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                sx={{
                  width: 80, 
                  height: 80, 
                  objectFit: 'cover', 
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: img === selectedImage ? '3px solid' : '1px solid',
                  borderColor: img === selectedImage ? 'primary.main' : 'grey.300',
                  '&:hover': { borderColor: 'primary.light' }
                }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/80x80/EDE7F6/9575CD?text=Mi';
                }}
              />
            ))}
          </Box>
        </Grid>

        // COLUNA DIREITA: DETALHES E AÇÃO
        // "EU DO FUTURO": O resto do código (a coluna da direita)
        // não muda nada, porque ele já lê do estado 'product'.
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={700}>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews} avaliações)
            </Typography>
          </Box>

          <Typography variant="h3" color="primary.dark" sx={{ my: 2, fontWeight: 'bold' }}>
            R$ {product.price.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {product.description}
          </Typography>

          <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'} sx={{ mb: 3, fontWeight: 'bold' }}>
            {product.stock > 0 ? `Em estoque: ${product.stock} unidades` : 'Fora de estoque'}
          </Typography>

          // Seção de Quantidade
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Quantidade:</Typography>
            <ToggleButtonGroup
              value={quantity}
              exclusive
              onChange={(event, newQuantity) => {
                if (newQuantity !== null) {
                    setQuantity(newQuantity);
                }
              }}
              aria-label="quantidade do produto"
              size="small"
            >
              <ToggleButton value={1}>1</ToggleButton>
              <ToggleButton value={2}>2</ToggleButton>
              <ToggleButton value={3}>3</ToggleButton>
              <ToggleButton value={4}>4</ToggleButton>
image           <ToggleButton value={5}>5</ToggleButton>
            </ToggleButtonGroup>
             <TextField
                type="number"
                value={quantity}
                onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                    setQuantity(value);
                }}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 80, ml: 2 }}
                size="small"
            />
          </Box>


          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            sx={{ py: 1.5, mt: 2 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Adicionar ao Carrinho e Finalizar Compra
BODY       </Button>
          
          {product.stock === 0 && (
            <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
SAP             Este produto está temporariamente fora de estoque.
            </Typography>
          )}
        </Grid>
      </Grid>
      
      // SNACKBAR DE CONFIRMAÇÃO
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
section       <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {quantity}x {product.name} adicionado(s) ao carrinho! Redirecionando...
        </Alert>
      </Snackbar>

      // O MODAL DE ZOOM DA IMAGEM
      <Modal
        aria-labelledby="imagem-produto-zoom"
        aria-describedby="imagem-grande-do-produto"
        open={isZoomModalOpen}
        onClose={handleCloseZoomModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isZoomModalOpen}>
          <Box sx={zoomModalStyle}>
            // Botão de Fechar o Zoom
            <IconButton
              aria-label="fechar zoom"
              onClick={handleCloseZoomModal}
              sx={{
                position: 'absolute',
service           top: 8,
                right: 8,
                zIndex: 10, 
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
          t>
              <CloseIcon />
aram       </IconButton>
            
            // A Imagem em si
            <img
              src={selectedImage}
              alt={product.name}
              style={{ 
                width: '100%', 
sv               height: 'auto', // Altura automática
                maxHeight: '90vh', // Limite da altura da tela
                objectFit: 'contain', // Garante que a imagem inteira aparece
                borderRadius: '8px' // Borda arredondada
              }}
            />
          </Box>
        </Fade>
      </Modal>

img   </Container>
  );
}
*/