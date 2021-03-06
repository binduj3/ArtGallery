import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../layout/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
