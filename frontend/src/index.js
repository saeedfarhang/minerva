import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": { borderRadius: 25 },
      },
    },
  },
  direction: "rtl",
  palette: {
    type: "light",
    primary: {
      light: "#ffffff",
      dark: "#aeaeae",
      main: "#e0e0e0",
      contrastText: "#424242",
    },
    secondary: {
      light: "#68f7ee",
      dark: "#00938c",
      main: "#1fc4bc",
      contrastText: "#ffffff",
    },
  },
  shape: {
    borderRadius: 25,
  },
  shadows: [
    "none",
    "none",
    // "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  // shadows:[none],
  typography: {
    fontFamily: ["Kohinoor Arabic", "Roboto"].join(","),
  },
});

import Routers from "./Routers";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <Routers />
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
