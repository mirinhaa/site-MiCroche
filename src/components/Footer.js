// Este é o componente do meu rodapé.

// Eu preciso importar o React para poder criar um componente.
import React from 'react';

// Aqui eu estou importando os componentes visuais que eu decidi usar da biblioteca Material-UI (MUI).
// O 'Box' é como uma <div>, mas com mais superpoderes de estilização.
// O 'Container' ajuda a centralizar meu conteúdo e limitar a largura em telas grandes.
// O 'Typography' eu uso para qualquer texto (parágrafos, títulos).
// O 'Link' é para... bem, links.
import { Box, Container, Typography, Link } from '@mui/material';

// Aqui eu defino e exporto meu componente Footer como padrão.
// Isso permite que eu o importe em outros lugares (tipo no App.js) só pelo nome "Footer".
export default function Footer() {
  // O 'return' é o que o meu componente vai de fato desenhar na tela.
  return (
    <Box
      // Eu digo ao Box para ele se comportar como uma tag <footer> do HTML.
      // Isso é bom para semântica e acessibilidade (SEO!).
      component="footer"
      // 'sx' é a forma do MUI de me deixar escrever CSS direto aqui.
      sx={{
        // Defino uma cor de fundo. Eu uso 'grey.300' que vem do tema do MUI,
        // assim, se um dia eu mudar meu tema, essa cor muda junto.
        backgroundColor: 'grey.300',
        // 'p: 4' é um atalho do MUI para 'padding'. O 4 não é 4px,
        // é 4 * 8px = 32px (o espaçamento padrão do tema).
        p: 4,
        // 'mt: 'auto''  Significa 'margin-top: auto'.
        // Se a minha página tiver pouco conteúdo, isso "empurra" o rodapé
        // para o final da tela, em vez de deixá-lo flutuando no meio.
        mt: 'auto',
      }}
    >
      {/* Eu uso o Container para que o conteúdo do rodapé não vá de
        uma ponta à outra da tela em monitores gigantes.
        'maxWidth="lg"' define uma largura máxima (large).
      */}
      <Container maxWidth="lg">
        {/* Este é o nome do meu site, com um estilo de texto 'body1' (padrão) */}
        <Typography variant="body1" align="center" gutterBottom>
          MiCroche
        </Typography>

        {/* Aqui vai o texto de copyright */}
        <Typography
          variant="body2" // 'body2' é um texto um pouco menor, bom para detalhes
          color="text.secondary" // Uma cor mais suave (cinza) do tema.
          align="center" // Centralizado
        >
          {/* As chaves {} me deixam misturar texto com JavaScript */}
          {'Copyright © '}
          <Link
            color="inherit" // O link vai "herdar" a cor do texto (o cinza suave)
            href="#" // Por enquanto não leva a lugar nenhum
          >
            MiCroche
          </Link>{' '}
          {/* Isso aqui é
            pega o ano atual automaticamente.
            Assim eu não preciso lembrar de atualizar isso todo dia 1º de janeiro.
          */}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}