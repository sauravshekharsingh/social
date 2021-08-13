// import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class PostsList extends React.Component {
  render() {
    const { postsList } = this.props.posts;

    return (
      <div className="posts">
        {/* {inProgress && <CircularProgress color="secondary" />} */}
        {postsList.map((post) => (
          <Post post={post} key={post._id}></Post>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(PostsList);
