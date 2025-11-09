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