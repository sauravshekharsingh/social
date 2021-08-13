const API_ROOT = 'http://localhost:8000/api';

export const APIUrls = {
  addFriend: (userId) => `${API_ROOT}/friends/add?userId=${userId}`,
  removeFriend: (userId) => `${API_ROOT}/friends/remove?userId=${userId}`,
  fetchFriends: () => `${API_ROOT}/friends`,
  fetchPosts: () => `${API_ROOT}/posts`,
  createPost: () => `${API_ROOT}/posts/create`,
  deletePost: (postId) => `${API_ROOT}/posts/delete?postId=${postId}`,
  createComment: (postId) => `${API_ROOT}/comments/create?postId=${postId}`,
  likePost: (on, postId) => `${API_ROOT}/likes/create?on=${on}&id=${postId}`,
  unlikePost: (on, postId) => `${API_ROOT}/likes/unlike?on=${on}&id=${postId}`,
  fetchUserProfile: (userId) => `${API_ROOT}/users/profile?userId=${userId}`,
  searchProfile: (searchText) =>
    `${API_ROOT}/users/profile/search?searchText=${searchText}`,
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
};
