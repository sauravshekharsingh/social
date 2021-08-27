import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

export default function PostsList() {
  const posts = useSelector((state) => state.posts);

  const { postsList } = posts;
  const location = window.location.pathname.substr(1, 5);
  const userId = location === 'users' ? window.location.pathname.substr(7) : '';

  return (
    <div className="posts">
      {postsList.map((post) => {
        if (location === 'users') {
          if (post.createdBy._id === userId) {
            return <Post post={post} key={post._id}></Post>;
          }
        } else {
          return <Post post={post} key={post._id}></Post>;
        }
        return null;
      })}
    </div>
  );
}
