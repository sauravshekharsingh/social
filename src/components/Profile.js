import { Avatar, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserProfile } from '../actions/search';
import { formatDate } from '../helpers/utils';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addFriend, removeFriend } from '../actions/friend';

class Profile extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.dispatch(fetchUserProfile(userId));
  }

  componentDidUpdate(prevProps, prevState) {
    const { userId: prevUserId } = prevProps.match.params;
    const { userId } = this.props.match.params;
    if (prevUserId !== userId) {
      this.props.dispatch(fetchUserProfile(userId));
    }
  }

  handleAddFriend = () => {
    const { userId } = this.props.match.params;
    this.props.dispatch(addFriend(userId));
  };

  handleRemoveFriend = () => {
    const { userId } = this.props.match.params;
    this.props.dispatch(removeFriend(userId));
  };

  render() {
    const { user } = this.props.search;
    const { user: authUser } = this.props.auth;
    const { friends } = this.props.friend;

    let isUserFriend = false;
    friends.map((friend) => {
      if (friend._id === user._id) {
        isUserFriend = true;
      }
      return '';
    });

    let isAuthUser = false;
    if (authUser.id === user._id) {
      isAuthUser = true;
    }

    return (
      <div className="profile">
        <h1>Profile</h1>
        <div className="avatar">
          <Avatar style={{ margin: '0 auto', width: 64, height: 64 }}></Avatar>
        </div>
        <div className="user-info">
          <div className="name">
            <span className="user-info-label">Name: </span>
            {user.name}
          </div>
          <div className="username">
            <span className="user-info-label">Username: </span>
            {user.username}
          </div>
          <div className="user-id">
            <span className="user-info-label">UserID: </span>
            {user._id}
          </div>
          <div className="joined-at">
            <span className="user-info-label">Joined: </span>
            {formatDate(user.createdAt)}
          </div>
        </div>
        {!isAuthUser && (
          <div>
            {isUserFriend && (
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleRemoveFriend}
              >
                <PersonAddDisabledIcon></PersonAddDisabledIcon>
                Remove Friend
              </Button>
            )}
            {!isUserFriend && (
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleAddFriend}
              >
                <PersonAddIcon></PersonAddIcon>
                Add Friend
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    friend: state.friend,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
