import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

// Estilo da caixa (Box) que aparece no centro da tela
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

// O Modal recebe 'open' (um booleano true/false)
// e 'handleClose' (a função que o fecha)
// e 'title' (o título)
// e 'children' (o conteúdo que vai dentro dele, ex: "Produto adicionado!")
export default function CustomModal({ open, handleClose, title, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title || 'Aviso'}
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          {children} 
        </Box>
        <Button 
          onClick={handleClose} 
          sx={{ mt: 3 }} 
          color="primary" 
          variant="contained"
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}