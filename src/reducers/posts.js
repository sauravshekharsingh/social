import { FETCH_POSTS_START, UPDATE_POSTS } from '../actions/actionTypes';

const initialPostsState = {
  postsList: [],
  inProgress: false,
};

export default function posts(state = initialPostsState, action) {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        inProgress: true,
      };

    case UPDATE_POSTS:
      return {
        ...state,
        postsList: action.posts,
        inProgress: false,
      };

    default:
      return state;
  }
}
