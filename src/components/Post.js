import React from 'react';
import { connect } from 'react-redux';

import { formatDate } from '../helpers/utils';
import { createComment, likePost, unlikePost } from '../actions/posts';
import { TextField, Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletePost } from '../actions/posts';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleLike = () => {
    const { _id: postId } = this.props.post;
    this.props.dispatch(likePost('Post', postId));
  };

  handleUnlike = () => {
    const { _id: postId } = this.props.post;
    this.props.dispatch(unlikePost('Post', postId));
  };

  handleDelete = () => {
    const { _id: postId } = this.props.post;
    this.props.dispatch(deletePost(postId));
  };

  handleComment = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    const { _id: postId } = this.props.post;

    this.props.dispatch(createComment(comment, postId));
  };

  render() {
    const { post } = this.props;
    const { user } = this.props.auth;

    let isLikedByUser = false;
    post.likes.map((like) => {
      if (user && like.createdBy._id === user.id) {
        isLikedByUser = true;
      }
      return '';
    });

    let isUserAuthor = false;
    if (post.createdBy._id === user.id) {
      isUserAuthor = true;
    }

    return (
      <div className="post">
        <div className="header">
          <div className="author">
            <Avatar></Avatar>
            <div>
              <Link
                to={`/users/${post.createdBy._id}`}
                style={{ textDecoration: 'none' }}
              >
                <p>{post.createdBy.name}</p>
              </Link>
              <p className="time">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          {isUserAuthor && (
            <div className="delete-post" onClick={this.handleDelete}>
              <DeleteIcon></DeleteIcon>
            </div>
          )}
        </div>
        <div className="body">
          <p>{post.content}</p>
        </div>
        <div className="actions">
          <div className="stats">
            {!isLikedByUser && (
              <div className="action" onClick={this.handleLike}>
                <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                <p>{post.likes.length} Likes</p>
              </div>
            )}
            {isLikedByUser && (
              <div className="action" onClick={this.handleUnlike}>
                <ThumbUpAltIcon></ThumbUpAltIcon>
                <p>{post.likes.length} Likes</p>
              </div>
            )}
            <div className="action">
              <CommentIcon></CommentIcon>
              <p>{post.comments.length} Comments</p>
            </div>
            <div
              className="action"
              onClick={() =>
                window.open(`https://wa.me/?text=${post.content}`, '_blank')
              }
            >
              <ShareIcon></ShareIcon>
              <p>Share</p>
            </div>
          </div>
          <div className="comment-container">
            {post.comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <div className="comment-author">
                  <Avatar style={{ width: 24, height: 24 }}></Avatar>
                  <span className="comment-author-name">
                    {comment.createdBy.name}
                  </span>
                </div>
                <div className="comment-content">
                  <span>{comment.content}</span>
                </div>
              </div>
            ))}
            <TextField
              label="Comment"
              variant="outlined"
              name="content"
              onChange={(event) =>
                this.setState({ comment: event.target.value })
              }
              size="small"
              style={{ width: 200 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleComment}
              style={{ marginLeft: 10 }}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Post);
