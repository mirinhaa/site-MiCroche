import { createTheme } from '@mui/material';

// 1. TEMA CUSTOMIZADO agora num ficheiro global)
export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#008B8B',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: {
      300: '#e0e0e0',
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.125rem',
      },
    },
    body1: {
      color: '#555'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, 
          textTransform: 'none',
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});