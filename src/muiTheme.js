import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// eslint-disable-next-line import/no-mutable-exports
let theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#5300e8',
    },
    neutral: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: 'normal',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 'normal',
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
