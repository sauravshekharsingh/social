import React, { Component } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {
  render() {
    const { user: authUser } = this.props.auth;

    return (
      <div className="sidebar">
        <div className="sidebar-list">
          <Link to={`/users/${authUser.id}`}>
            <div className="sidebar-list-item">
              <AccountCircleIcon></AccountCircleIcon>
              <span>{authUser.name}</span>
            </div>
          </Link>
          <Link to="/friends">
            <div className="sidebar-list-item">
              <PeopleIcon></PeopleIcon>
              <span>Friends</span>
            </div>
          </Link>
          <Link to="/posts">
            <div className="sidebar-list-item">
              <ListAltIcon></ListAltIcon>
              <span>Posts</span>
            </div>
          </Link>
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

export default connect(mapStateToProps)(Sidebar);
