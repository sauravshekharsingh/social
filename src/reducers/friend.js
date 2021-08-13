import { FETCH_FRIENDS_SUCCESS } from '../actions/actionTypes';

const initialFriendState = {
  friends: [],
};

export default function friend(state = initialFriendState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.friends,
      };

    default:
      return state;
  }
}
