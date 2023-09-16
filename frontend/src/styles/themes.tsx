import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
  }
  interface PaletteOptions {
  }
}

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#22b24c',
    },
    secondary: {
      main: '#369',
    },
  },
});
