import { createTheme } from "@mui/material"

const defaultTheme = createTheme({
palette:{
    secondary:{
        main:"#2F4858"
    },
    otherColor:{
        main:"#fefefe"
    }
},
typography: {
    fontFamily: 'Roboto',
  },
})

export default defaultTheme