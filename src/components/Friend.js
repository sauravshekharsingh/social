import { Avatar, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { fetchFriends, removeFriend } from '../actions/friend';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  friend: {
    padding: 10,
  },
});

export default function Friend(props) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const friend = useSelector((state) => state.friend);

  const dispatch = useDispatch();

  useEffect(() => {
    const { user: authUser } = auth;
    dispatch(fetchFriends(authUser._id));
  }, [dispatch, auth]);

  const handleRemoveFriend = (userId) => {
    dispatch(removeFriend(userId));
  };

  const { friends } = friend;

  return (
    <div className="friends">
      <Card className={`friends-card`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Friends
          </Typography>
          {friends.map((friend, index) => {
            return (
              <Card
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                className={classes.friend}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar style={{ marginRight: 10 }}></Avatar>
                  <Link
                    to={`/users/${friend._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <p>{friend.name}</p>
                  </Link>
                </div>
                <div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleRemoveFriend(friend._id)}
                  >
                    <PersonAddDisabledIcon></PersonAddDisabledIcon>Remove Friend
                  </Button>
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
