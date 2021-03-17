import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
