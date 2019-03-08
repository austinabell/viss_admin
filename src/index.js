import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Constants from "./constants";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import Routes from "./routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.primaryColor
    },
    secondary: {
      main: Constants.secondaryColor
    },
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
