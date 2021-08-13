import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { FETCH_POSTS_START, UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    const url = APIUrls.fetchPosts();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(updatePosts(data.posts));
      })
      .catch((err) => console.log(err));
  };
}

function fetchPostsStart() {
  return {
    type: FETCH_POSTS_START,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPosts());
      })
      .catch((err) => console.log(err));
  };
}

export function deletePost(postId) {
  return (dispatch) => {
    const url = APIUrls.deletePost(postId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ postId }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPosts());
      })
      .catch((err) => console.log(err));
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment(postId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPosts());
      })
      .catch((err) => console.log(err));
  };
}

export function likePost(on, postId) {
  return (dispatch) => {
    const url = APIUrls.likePost(on, postId);
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
        dispatch(fetchPosts());
      })
      .catch((err) => console.log(err));
  };
}

export function unlikePost(on, postId) {
  return (dispatch) => {
    const url = APIUrls.unlikePost(on, postId);
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
        dispatch(fetchPosts());
      })
      .catch((err) => console.log(err));
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
