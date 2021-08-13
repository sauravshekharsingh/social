import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import search from './search';
import friend from './friend';

export default combineReducers({
  posts,
  auth,
  search,
  friend,
});
