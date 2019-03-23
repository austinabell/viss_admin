import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import ThemedApp from "./theme";

const uri =
  process.env.REACT_APP_API_HOST ||
  `http://${window.location.hostname}:5000/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemedApp />
      </MuiPickersUtilsProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
