import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,

  ...rest
}) => {
  const loginDetails = useSelector((state) => state.login);
  const { isAuthenticated, loading } = loginDetails;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
