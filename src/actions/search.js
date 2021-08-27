import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_PROFILE_SUCCESS, SEARCH_PROFILE_SUCCESS } from "./actionTypes";
import { fetchFriends } from "./friend";

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(fetchFriends());
    const url = APIUrls.fetchUserProfile(userId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(fetchProfileSuccess(data.message, data.user));
        }
      })
      .catch((err) => console.log(err));
  };
}

function fetchProfileSuccess(message, user) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    message,
    user,
  };
}

export function searchProfile(searchText) {
  return (dispatch) => {
    const url = APIUrls.searchProfile(searchText);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchProfileSuccess(data.message, data.users));
        }
      })
      .catch((err) => console.log(err));
  };
}

function searchProfileSuccess(message, results) {
  return {
    type: SEARCH_PROFILE_SUCCESS,
    message,
    results,
  };
}
