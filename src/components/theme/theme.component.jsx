import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E8E9EB",
    },
    secondary: {
      main: "#313628",
    },
    otherColor: {
      main: "#38618C",
    },
    accentColor: {
      main: "#F06543",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default defaultTheme;
