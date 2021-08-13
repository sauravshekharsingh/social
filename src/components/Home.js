import React from 'react';
import { connect } from 'react-redux';

import PostsList from './PostsList';
import { createPost, fetchPosts } from '../actions/posts';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { content } = this.state;
    this.props.dispatch(createPost(content));
  };

  render() {
    return (
      <div className="home">
        <div className="create-post-form">
          <form>
            <TextField
              multiline
              rows={5}
              id="outlined-basic"
              label="Compose"
              variant="outlined"
              name="content"
              placeholder="What's on your mind?"
              onChange={(event) =>
                this.setState({ content: event.target.value })
              }
              style={{ width: 400 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Post
            </Button>
          </form>
        </div>
        <PostsList></PostsList>
      </div>
    );
  }
}

export default connect()(Home);
