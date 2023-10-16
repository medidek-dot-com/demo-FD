import {createTheme} from '@mui/material'

export const theme = createTheme({
    // typography: {
    //     fontFamily: [
    //         // 'Raleway',
    //         'sans-serif'
    //     ].join(',')
    // },
    palette:{
        primary:{
            main:"#1F51C6",
            light:"#ffffff",
            dark:"ffffff"
        },
        secondary:{
            main:"#ffffff",
            light:"#ffffff",
            dark:"ffffff"
        },
        success:{
            main:"#15B912",
            light:"#ffffff",
            dark:"ffffff"
        }
    },
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiInput-underline:before': {
                borderBottomColor: '#ffffff',
              },
              '&:hover .MuiInput-underline:after': {
                borderBottomColor: '#ffffff', // Hover underline color
              },
            },
          },
        },
      },
    overrides: {
        MuiInput: {
          underline: {
            '&:before': {
              borderBottomColor: '#ffffff', // Aapka naya color yahan set karen
            },
          },
        },
      },
})