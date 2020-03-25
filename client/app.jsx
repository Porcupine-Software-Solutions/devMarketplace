import React, { Component } from 'react';
import { render } from 'react-dom';
import Login from './login.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }
  render() {
    //if not logged in, return the login page
    if (this.state.loggedIn === false) {
      return <Login />;
    }
    //if authorized, return second page
    //if engineer, return job seeker page
    //if employer, return employer page
  }
}
export default App;
