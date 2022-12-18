import { blueGrey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
  }
}

export const bankTheme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.17rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '0.83rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '0.67rem',
      fontWeight: 400,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    neutral: {
      light: blueGrey[400],
      main: blueGrey[500],
      dark: blueGrey[700],
      contrastText: '#fff',
    },
  },
})
