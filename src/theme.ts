import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      light: '#4F5B93',
      main: '#2C3E50',
      dark: '#1A242F',
    },
    secondary: {
      main: '#FF9800',
    },
    background: {
      default: '#F7F9FC',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#00bcd4',
    },
    warning: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export const highchartsTheme: Highcharts.Options = {
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  title: {
    text: '',
  },
  tooltip: {
    shadow: false,
    borderWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    style: {
      fontSize: '14px',
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      borderWidth: 0,
      dataLabels: {
        style: {
          fontSize: '14px',
          textOutline: 'none',
        },
      },
    },
    bar: {
      borderWidth: 0,
      dataLabels: {
        style: {
          fontSize: '14px',
          textOutline: 'none',
        },
      },
    },
    column: {
      borderWidth: 0,
      dataLabels: {
        style: {
          fontSize: '14px',
          textOutline: 'none',
        },
      },
    },
  },
  colors: [
    '#2C3E50', // azul oscuro
    '#FF9800', // naranja
    '#4caf50', // verde
    '#f44336', // rojo
    '#00bcd4', // celeste
    '#e91e63', // rosa
    '#607d8b', // blue grey
    '#8e44ad', // violeta
    '#43a047', // verde oscuro
    '#ff7043', // naranja fuerte
    '#ffd600', // amarillo
    '#009688', // teal
    '#ec407a', // pink
    '#26c6da', // cyan
    '#cddc39', // lime
    '#ff5722', // deep orange
    '#673ab7', // deep purple
    '#3f51b5', // indigo
    '#795548', // brown
    '#9e9e9e', // grey
  ],
};
