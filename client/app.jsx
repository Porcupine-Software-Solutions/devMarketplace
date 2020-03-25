import React, { Component } from 'react';
import Login from './components/login.jsx';
import Marketplace from './components/marketplace';
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
    if (this.state.loggedIn === true) {
      return <Marketplace />;
    }
    //if engineer, return job seeker page
    //if employer, return employer page
  }
}
export default App;
