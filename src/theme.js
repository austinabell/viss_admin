import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";

import Constants from "./constants";
import Routes from "./routes";

function ThemedApp({ config }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: Constants.primaryColor
      },
      secondary: {
        main: Constants.secondaryColor
      },
      type: config.theme
    },
    typography: {
      useNextVariants: true
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  config: state.config
});

export default connect(mapStateToProps)(ThemedApp);
