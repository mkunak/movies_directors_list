import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    color: '#f4f1de',
    fontSize: 16,
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    type: 'dark',
    primary: { main: '#b5838d' },
    secondary: { main: '#f4f1de' },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: '#f4f1de',
  }
});

export default responsiveFontSizes(theme);