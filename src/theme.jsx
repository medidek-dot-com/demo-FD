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
            main:"#1F51C6"
        },
        secondary:{
            main:"#ffffff"
        },
        success:{
            main:"#15B912"
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