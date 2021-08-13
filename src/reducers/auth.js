import {
  AUTHENTICATE_USER,
  AUTH_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_USER_STATE,
  LOGOUT_USER,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  errors: [],
  message: '',
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
      };

    case AUTH_START:
      return {
        ...state,
        errors: [],
        message: '',
        inProgress: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        message: action.message,
        user: action.user,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        message: action.message,
      };

    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      };

    case CLEAR_USER_STATE:
      return {
        ...state,
        inProgress: false,
        message: '',
        errors: [],
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
