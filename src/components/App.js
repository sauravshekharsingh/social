import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles.css';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Friend from './Friend';
import Profile from './Profile';

import { useSelector } from 'react-redux';

export default function App() {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  return (
    <Router>
      <div className="App">
        <Navbar />
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
    </Router>
  );
}
