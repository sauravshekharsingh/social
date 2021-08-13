import {
  CLEAR_SEARCH_STATE,
  FETCH_PROFILE_SUCCESS,
  SEARCH_PROFILE_SUCCESS,
} from '../actions/actionTypes';

const initialSearchState = {
  user: {},
  isUserFriend: false,
  results: [],
  message: '',
  showSearchResults: false,
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        message: action.message,
        user: action.user,
        showSearchResults: false,
      };

    case SEARCH_PROFILE_SUCCESS:
      return {
        ...state,
        message: action.message,
        results: action.results,
        showSearchResults: true,
      };

    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        results: [],
        message: '',
        showSearchResults: false,
      };

    default:
      return state;
  }
}
