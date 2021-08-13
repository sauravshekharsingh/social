import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS } from './actionTypes';

export function addFriend(userId) {
  return (dispatch) => {
    const url = APIUrls.addFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ userId }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchFriends());
      })
      .catch((err) => console.log(err));
  };
}

export function removeFriend(userId) {
  return (dispatch) => {
    const url = APIUrls.removeFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ userId }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchFriends());
      })
      .catch((err) => console.log(err));
  };
}

export function fetchFriends() {
  return (dispatch) => {
    const url = APIUrls.fetchFriends();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(fetchFriendsSuccess(data.friends));
        }
      })
      .catch((err) => console.log(err));
  };
}

function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
