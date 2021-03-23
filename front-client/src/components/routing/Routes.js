import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
      </Switch>
    </Router>
  );
};

export default Routes;
