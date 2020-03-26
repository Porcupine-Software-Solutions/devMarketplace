import React, { Component } from 'react';
import { render } from 'react-dom';
import { authorize, changePost, addBid } from '../actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  logins: state.logins.authorized
});

const mapDispatchToProps = (dispatch) => ({
  authorize: (bool) => {
    return dispatch(authorize(bool));
  },
});

const Login = (props) => {
  const register = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.authorized) {
          props.authorize(true);
        }
      });
  };
  const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.authorized) {
          props.authorize(true);
        }
      });
  };
  return (
    <div className="Auth">
      <h1>Login/Signup</h1>
      <div className="innerBox">
        <div className="innerItem">
          <input id="username" type="text" placeholder="Username"></input>
        </div>
        <div className="innerItem">
          <input id="password" type="password" placeholder="Password"></input>
        </div>
      </div>
      <div className="innerItem">
        <button className="innerBtn" onClick={() => login()}>
          Login
        </button>
        <button className="innerBtn" onClick={() => register()}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
