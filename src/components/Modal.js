// Este é o meu componente de Modal customizado.
// Eu criei ele para não ter que repetir esse código toda vez que eu precisar de um pop-up.

import React from 'react';
// Eu importo as peças que preciso do Material-UI
import { Modal, Box, Typography, Button } from '@mui/material';

// Eu defini o estilo da caixa do modal aqui fora do componente
// para deixar o código lá embaixo mais limpo.
const style = {
  // Isso, junto com o top/left/transform, centraliza a caixa
  position: 'absolute',
  // Coloca o topo da caixa no meio da tela
  top: '50%',
  // Coloca a esquerda da caixa no meio da tela
  left: '50%',
  // Isso ele "puxa" a caixa de volta
  // pela metade da altura e largura dela mesma,
  // centralizando o *centro* dela, e não o canto superior esquerdo.
  transform: 'translate(-50%, -50%)',
  // Uma largura fixa pro meu modal
  width: 400,
  // 'background.paper' é uma cor do meu tema MUI (geralmente branco)
  bgcolor: 'background.paper',
  // 'borderRadius: 4' usa o valor do tema para arredondar as bordas
  borderRadius: 4,
  // 'boxShadow: 24' é uma sombra bem forte do MUI, para dar destaque
  boxShadow: 24,
  // 'p: 4' é um padding (espaçamento interno) de 4 * 8px = 32px
  p: 4,
};

// Aqui eu defino meu componente e as 'props' que ele vai receber.
// Eu desestruturei as props ({ open, handleClose... })
// para poder usá-las direto pelo nome.
// - open: um booleano (true/false) que diz se o modal está aberto ou não.
// - handleClose: a *função* que o componente pai vai me passar para fechar o modal.
// - title: o texto que vai aparecer no título.
// - children: esse é um prop especial, é tudo o que eu colocar *dentro*
//   da tag <CustomModal>...</CustomModal> quando eu for usá-la.
export default function CustomModal({ open, handleClose, title, children }) {
  // O return é o que vai ser desenhado na tela
  return (
    // O <Modal> do MUI cuida de escurecer o fundo e de
    // chamar o onClose se eu clicar fora da caixa.
    <Modal
      open={open} // Eu passo a prop 'open' que eu recebi
      onClose={handleClose} // Eu digo qual função rodar ao clicar fora
      // 'aria-labelledby' e 'aria-describedby' são super importantes
      // para acessibilidade. Elas conectam o modal com seu título e descrição
      // para leitores de tela.
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Este <Box> é a caixa branca que aparece no meio.
        Eu aplico o objeto 'style' que criei lá em cima.
      */}
      <Box sx={style}>
        {/* O Título do Modal */}
        <Typography id="modal-title" variant="h6" component="h2">
          {/* Isso eu mostro o 'title' que recebi.
            Mas se eu esquecer de passar um título (ele for 'undefined'),
            eu mostro 'Aviso' como um texto padrão.
          */}
          {title || 'Aviso'}
        </Typography>

        {/* O Conteúdo (Corpo) do Modal */}
        <Box id="modal-description" sx={{ mt: 2 }}>
          {/* É aqui que a maravilha do 'children' acontece.
            Qualquer coisa que eu passar (um texto, um formulário, uma imagem)
            vai aparecer aqui dentro.
          */}
          {children}
        </Box>

        {/* O Botão de Fechar */}
        <Button
          onClick={handleClose} // Ele chama a *mesma* função de fechar
          sx={{ mt: 3 }} // 'mt: 3' dá uma margem em cima (margin-top)
          color="primary" // Usa a cor primária do meu tema
          variant="contained" // 'contained' é o estilo de botão sólido
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}