import { Avatar, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import { fetchFriends, removeFriend } from '../actions/friend';

class Friend extends Component {
  componentDidMount() {
    const { user: authUser } = this.props.auth;
    this.props.dispatch(fetchFriends(authUser._id));
  }

  handleRemoveFriend = (userId) => {
    this.props.dispatch(removeFriend(userId));
  };

  render() {
    const { friends } = this.props.friend;

    return (
      <div className="friends">
        <h1>Friends</h1>
        <div className="friend-list">
          {friends.map((friend, index) => {
            return (
              <div className="friend-listitem" key={friend._id}>
                <div class="friend-detail">
                  <Avatar></Avatar>
                  <Link to={`/users/${friend._id}`}>
                    <p>{friend.name}</p>
                  </Link>
                </div>
                <div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => this.handleRemoveFriend(friend._id)}
                  >
                    <PersonAddDisabledIcon></PersonAddDisabledIcon>Remove Friend
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    friend: state.friend,
  };
}

export default connect(mapStateToProps)(Friend);
