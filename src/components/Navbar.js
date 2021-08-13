import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/user';
import { searchProfile } from '../actions/search';
import { Avatar, Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      showMenu: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.props.dispatch(searchProfile(this.state.searchText));
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  showMenu = () => {
    this.setState({
      showMenu: true,
    });
  };

  hideMenu = () => {
    this.setState({
      showMenu: false,
    });
  };

  render() {
    const { user, isLoggedIn } = this.props.auth;
    const results = this.props.search.results;
    const { showSearchResults } = this.props.search;
    const { showMenu } = this.state;
    console.log('SHOW MENU', showMenu);

    return (
      <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>SOCIAL</h2>
        </Link>
        {isLoggedIn && (
          <div className="search-container">
            <div className="search-box">
              <TextField
                id="standard-search"
                type="search"
                placeholder="Search Users"
                variant="outlined"
                onChange={(event) =>
                  this.setState({ searchText: event.target.value })
                }
                InputProps={{
                  startAdornment: <SearchIcon></SearchIcon>,
                }}
                size="small"
                style={{ width: 250 }}
              />
            </div>
            {showSearchResults && (
              <div className="search-results">
                {results.map((result) => (
                  <Link
                    to={`/users/${result._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="search-results-row">
                      <Avatar style={{ marginRight: 10 }}></Avatar>
                      <p>{result.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="nav-links">
          {isLoggedIn && (
            <div className="nav-actions">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  <HomeIcon></HomeIcon>Home
                </Button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
              >
                <div className="user">
                  <Avatar style={{ width: 24, height: 24 }}></Avatar>
                  <p>{user.name}</p>
                </div>
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <div className="nav-actions">
              <div>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary">
                    <VpnKeyIcon></VpnKeyIcon>Login
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary">
                    <AccountBoxIcon></AccountBoxIcon>Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {isLoggedIn && (
            <Button variant="contained" color="secondary" onClick={this.logout}>
              <ExitToAppIcon></ExitToAppIcon>Log Out
            </Button>
          )}
        </div>
        <div className="nav-menu-btn" onClick={this.showMenu}>
          <MenuIcon></MenuIcon>
        </div>
        {showMenu && (
          <div className="nav-menu">
            <div className="nav-menu-list">
              <div className="nav-menu-listitem">
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10, width: 150 }}
                    onClick={this.hideMenu}
                  >
                    <div className="user">
                      <Avatar style={{ width: 24, height: 24 }}></Avatar>
                      <p>{user.name}</p>
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="nav-menu-listitem">
                <Link to="/friends" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10, width: 150 }}
                    onClick={this.hideMenu}
                  >
                    Friends
                  </Button>
                </Link>
              </div>
              <div className="nav-menu-listitem">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.logout}
                  style={{ marginRight: 10, width: 150 }}
                >
                  <ExitToAppIcon></ExitToAppIcon>Log Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
  };
}

export default connect(mapStateToProps)(Navbar);
