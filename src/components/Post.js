import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { formatDate } from '../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  deletePost,
  likePost,
  unlikePost,
} from '../actions/posts';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  comment: {
    margin: 10,
  },
  commentInput: {
    width: '70%',
  },
  commentButton: {
    width: '30%',
  },
}));

export default function Post({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let isUserAuthor = false;
  if (post.createdBy._id === auth.user.id) {
    isUserAuthor = true;
  }

  let isLikedByUser = false;
  post.likes.map((like) => {
    if (auth.user && like.createdBy._id === auth.user.id) {
      isLikedByUser = true;
    }
    return '';
  });

  const handleLike = () => {
    dispatch(likePost('Post', post._id));
  };

  const handleUnlike = () => {
    dispatch(unlikePost('Post', post._id));
  };

  const handleComment = (e) => {
    dispatch(createComment(comment, post._id));
    setComment('');
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}></Avatar>}
        action={
          isUserAuthor && (
            <IconButton aria-label="settings" onClick={handleDelete}>
              <DeleteOutlinedIcon />
            </IconButton>
          )
        }
        title={
          <Link to={`/users/${post.createdBy._id}`}>{post.createdBy.name}</Link>
        }
        subheader={formatDate(post.createdAt)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div
          className="action"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {!isLikedByUser && (
            <IconButton onClick={handleLike}>
              <ThumbUpAltOutlinedIcon />
            </IconButton>
          )}
          {isLikedByUser && (
            <IconButton onClick={handleUnlike}>
              <ThumbUpIcon />
            </IconButton>
          )}
          <Typography>{post.likes.length} Likes</Typography>
        </div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <CommentOutlinedIcon />
        </IconButton>
        <Typography>{post.comments.length} Comments</Typography>
        <IconButton
          onClick={() =>
            window.open(`https://wa.me/?text=${post.content}`, '_blank')
          }
        >
          <ShareOutlinedIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card className={classes.comment}>
          <CardContent>
            <TextField
              label="Comment"
              variant="outlined"
              name="content"
              onChange={(e) => setComment(e.target.value)}
              size="small"
              className={classes.commentInput}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleComment}
              className={classes.commentButton}
            >
              Comment
            </Button>
          </CardContent>
          {post.comments.map((comment) => (
            <CardHeader
              avatar={<Avatar className={classes.avatar}></Avatar>}
              title={comment.createdBy.name}
              subheader={comment.content}
              key={comment._id}
            />
          ))}
        </Card>
      </Collapse>
    </Card>
  );
}
