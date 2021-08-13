import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import App from './components/App';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from './actions/user';

const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  const user = jwtDecode(token);
  store.dispatch(authenticateUser(user));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
