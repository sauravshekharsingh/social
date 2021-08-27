import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PostsList from './PostsList';
import { createPost, fetchPosts } from '../actions/posts';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default function Home() {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPost(content));
  };

  return (
    <div className="home">
      <Card className={`compose`}>
        <CardContent>
          <TextField
            multiline
            rows={5}
            id="outlined-basic"
            label="Compose"
            variant="outlined"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%' }}
          />
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </CardActions>
      </Card>
      <PostsList></PostsList>
    </div>
  );
}
