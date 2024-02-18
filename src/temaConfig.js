import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    color: '#0C0901',
    fontFamily: ['Lexend'].join(','),
    detalle: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '0.688rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h1Custom: {
      color: '#FFF',
      fontWeight: 700,
      fontSize: '2.25rem',
      fontFamily: ['Lexend'].join(','),
    },
    h1: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '2rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    carrusel: {
      color: '#FFF',
      fontWeight: 200,
      fontSize: '2rem',
      fontFamily: ['Lexend'].join(','),
    },
    titulo: {
      color: '#164439',
      fontWeight: 800,
      fontSize: '1.125rem',
      fontFamily: ['Hagrid Text Trial'].join(','),
    },
    h2: {
      color: '#0C0901',
      fontWeight: 400,
      fontSize: '1rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h2Custom: {
      color: '#164439',
      fontWeight: 500,
      fontSize: '1rem',
    },
    h2Description: {
      color: '#FFF',
      fontWeight: 300,
      fontSize: '1rem',
    },
    h3Counter: {
      color: '#9A9A9A',
      fontWeight: 200,
      fontSize: '0.938rem',
      fontFamily: ['Lexend'].join(','),
    },
    category: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: "0.875rem",
    },
    h4: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '0.875rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h4Custom: {
      color: '#0C0901',
      fontWeight: 300,
      fontSize: '0.875rem',
      fontFamily: ['Lexend'].join(','),
    },
    drawer: {
      color: '#9A9A9A',
      fontWeight: 300,
      fontSize: '0.875rem',
    },
    stock: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    h5: {
      color: '#FFF',
      fontWeight: 300,
      fontSize: '0.813rem',
    },
    h6: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '0.75rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    service: {
      color: '#164439',
      fontWeight: 400,
      fontSize: '1.375rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    serviceBold: {
      color: '#164439',
      fontWeight: 800,
      fontSize: '1.5rem',
      fontFamily: ['Hagrid Text Trial'].join(','),
    },
  },
});

export default theme;