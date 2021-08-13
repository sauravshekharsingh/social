import { getFormBody } from '../helpers/utils';
import {
  SIGNUP_FAILED,
  AUTH_START,
  SIGNUP_SUCCESS,
  CLEAR_USER_STATE,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTHENTICATE_USER,
  LOGOUT_USER,
} from './actionTypes';

import { APIUrls } from '../helpers/urls';

function authStart() {
  return {
    type: AUTH_START,
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(authStart());
    const url = APIUrls.login();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        username,
        password,
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          dispatch(loginSuccess(data.message, data.user));
        } else {
          dispatch(loginFailed(data.message));
        }
      })
      .catch((err) => console.log(err));
  };
}

function loginSuccess(message, user) {
  return {
    type: LOGIN_SUCCESS,
    message,
    user,
  };
}

function loginFailed(errors) {
  return {
    type: LOGIN_FAILED,
    errors,
  };
}

export function signup(name, email, username, password, confirm_password) {
  return (dispatch) => {
    dispatch(authStart());
    const url = APIUrls.signup();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        name,
        email,
        username,
        password,
        confirm_password,
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(signupSuccess(data.message));
        } else {
          dispatch(signupFailed(data.message));
        }
      })
      .catch((err) => console.log(err));
  };
}

function signupSuccess(message) {
  return {
    type: SIGNUP_SUCCESS,
    message,
  };
}

function signupFailed(errors) {
  return {
    type: SIGNUP_FAILED,
    errors,
  };
}

export function clearUserState() {
  return {
    type: CLEAR_USER_STATE,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
