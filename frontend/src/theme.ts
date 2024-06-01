import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    secondary: {
      main: '#dc004e', // Change secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Change default font family
  },
  // Add more customizations as needed
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // This will remove uppercase transformation
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
        }
      }
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       margin: 0, // Overwrite the default margin
    //     },
    //   },
    // },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       margin: 0,
    //     }
    //   }
    // },
  }
});

export default theme;
