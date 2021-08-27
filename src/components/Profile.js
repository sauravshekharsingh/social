import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserProfile } from '../actions/search';
import { formatDate } from '../helpers/utils';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addFriend, removeFriend } from '../actions/friend';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostsList from './PostsList';

export default function Profile(props) {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search);
  const auth = useSelector((state) => state.auth);
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    const { userId } = props.match.params;
    dispatch(fetchUserProfile(userId));
  }, [dispatch, props.match.params]);

  const handleAddFriend = () => {
    const { userId } = props.match.params;
    dispatch(addFriend(userId));
  };

  const handleRemoveFriend = () => {
    const { userId } = props.match.params;
    dispatch(removeFriend(userId));
  };

  const { user } = search;
  const { user: authUser } = auth;
  const { friends } = friend;

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
      <Card className={`profile-card`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Profile
          </Typography>
          <div className="user-info">
            <div className="name">
              <Typography variant="h6">
                <span className="profile-card-label">Name: </span>
                {user.name}
              </Typography>
            </div>
            <div className="username">
              <Typography variant="h6">
                <span className="profile-card-label">Username: </span>
                {user.username}
              </Typography>
            </div>
            <div className="user-id">
              <Typography variant="h6">
                <span className="profile-card-label">UserID: </span>
                {user._id}
              </Typography>
            </div>
            <div className="joined-at">
              <Typography variant="h6">
                <span className="profile-card-label">Joined: </span>
                {formatDate(user.createdAt)}
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions>
          {!isAuthUser && (
            <div>
              {isUserFriend && (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleRemoveFriend}
                >
                  <PersonAddDisabledIcon></PersonAddDisabledIcon>
                  Remove Friend
                </Button>
              )}
              {!isUserFriend && (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleAddFriend}
                >
                  <PersonAddIcon></PersonAddIcon>
                  Add Friend
                </Button>
              )}
            </div>
          )}
        </CardActions>
      </Card>
      <PostsList></PostsList>
    </div>
  );
}
