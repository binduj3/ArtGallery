import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../actions/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginDetails = useSelector((state) => state.login);

  // useEffect(() => {
  //   if (loginDetails.isAuthenticated) {
  //     <Redirect to='/dashboard' />;
  //   }
  // }, [loginDetails.isAuthenticated]);

  const onClick = () => {
    dispatch(login({ email: username, password }));
  };

  if (loginDetails.isAuthenticated) {
    <Redirect to='/dashboard' />;
  }

  return (
    <div className='container vh-100'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-md-6 shadow p-3 mb-5 bg-body rounded '>
          <div className='form-group'>
            <label for='username' className='color-orange'>
              Username:
            </label>
            <br />
            <input
              type='text'
              name='username'
              id='username'
              className='form-control'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label for='password' className='color-orange'>
              Password:
            </label>
            <br />
            <input
              type='text'
              name='password'
              id='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button
              type='button'
              name='submit'
              className='btn bg-color-orange btn-md text-white'
              onClick={onClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
