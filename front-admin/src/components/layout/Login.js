import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/login";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(login(username, password));
  };

  return (
    <div className='container'>
      <div className=''>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-6 shadow p-3 mb-5 bg-body rounded'>
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
                onChange={() => setUsername(e.target.value)}
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
                onChange={() => setPassword(e.target.value)}
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
    </div>
  );
};

export default login;
