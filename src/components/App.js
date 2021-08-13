import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles.css';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Friend from './Friend';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';

import Profile from './Profile';
import Sidebar from './Sidebar';

class App extends React.Component {
  render() {
    const { isLoggedIn } = this.props.auth;

    return (
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <PrivateRoute
              path="/"
              component={Sidebar}
              isLoggedIn={isLoggedIn}
            ></PrivateRoute>
            <div className="main">
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  component={Home}
                  isLoggedIn={isLoggedIn}
                ></PrivateRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={Signup}></Route>
                <PrivateRoute
                  path="/users/:userId"
                  component={Profile}
                  isLoggedIn={isLoggedIn}
                ></PrivateRoute>
                <PrivateRoute
                  path="/friends"
                  component={Friend}
                  isLoggedIn={isLoggedIn}
                ></PrivateRoute>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
