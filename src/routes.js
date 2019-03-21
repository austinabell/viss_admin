import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers/history";
// import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const scrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

function Routes() {
  return (
    <Router history={history}>
      <Fragment>
        <Route component={scrollToTop} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route component={Dashboard} /> {/* Change backup if routing */}
        </Switch>
      </Fragment>
    </Router>
  );
}

export default Routes;
