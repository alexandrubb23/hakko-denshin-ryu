import { createTheme } from '@mui/material';

import Jarene from '@assets/fonts/Jarene.otf';
import Rubik from '@assets/fonts/Rubik.ttf';
import Inter from '@assets/fonts/Inter.ttf';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 866,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#AB96FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffd700',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
    },
  },
  typography: {
    fontFamily: 'Jarene, Arial, sans-serif',
    h2Inter: {
      fontFamily: 'Inter',
      fontSize: 'clamp(1rem, calc(2vw + 1rem), 3rem)',
      fontWeight: 400,
      lineHeight: 1.2,
      padding: 16,
      paddingBottom: 0,
      paddingTop: 0,
      textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
    },
    h1: {
      padding: 16,
      fontSize: 'clamp(2rem, calc(3vw + 1rem), 3rem)',
    },
    h2: {
      padding: 16,
      fontSize: 'clamp(2rem, calc(3vw + 1rem), 3rem)',
    },
    h3: {
      padding: 16,
      fontSize: 'clamp(2rem, calc(7vw + 1rem), 2.375rem)',
    },
    subtitle1: {
      padding: 16,
      lineHeight: 1.2,
      fontSize: 'clamp(1rem, calc(2vw + 1rem), 3rem)',
    },
    body1: {
      fontFamily: 'Inter',
    },
    body2: {
      fontFamily: 'Inter',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h2Inter: 'h2',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --bar-width: 30px;
          --bar-height: 2px;
          --hamburger-gap: 8px;
          --foreground-color: #fff;
          --background-color: rgba(0, 0, 0, 0.5);
          --backdrop-filter: 20px;
          --hamburger-margin: 18px;
          --animation-timing: .5s ease-in-out;
          --hamburger-height: calc(var(--bar-height) * 3 + var(--hamburger-gap) * 2);
          --body-background: #000;
        }
        @font-face {
          font-family: 'Jarene';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Jarene'), url(${Jarene}) format('opentype');
        }
        @font-face {
          font-family: 'Rubik';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Rubik'), url(${Rubik}) format('opentype');
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), url(${Inter}) format('opentype');
        }
        body {
          background-color: var(--body-background);
          background-size: cover;
          background-position: center;
          color: #e7e7e7;
          font-size: clamp(12px, 3vw, 24px);
        }   
      `,
    },
  },
});

export default theme;
