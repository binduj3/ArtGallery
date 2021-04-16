import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Routes from "./components/routing/Routes";
import { checkUserExists } from "./actions/login";

const App = () => {
  // useEffect(() => {
  //   store.dispatch(checkUserExists());
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
