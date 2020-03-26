import React, { Component } from 'react';
import Login from './components/login.jsx';
import Marketplace from './components/marketplace.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  authorized: state.logins.authorized,
});

const App = (props) => {
  //if not logged in, return the login page
  if (props.authorized === false) {
    return <Login />;
  }
  //if authorized, return second page
  if (props.authorized === true) {
    return <Marketplace />;
  }
  // if user clicks button, video chat component renders

  //if engineer, return job seeker page
  //if employer, return employer page
};
export default connect(mapStateToProps)(App);
