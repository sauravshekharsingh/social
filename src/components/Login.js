import { Button, CircularProgress, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearUserState, login } from '../actions/user';
import Alert from '@material-ui/lab/Alert';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.dispatch(login(username, password));
  };

  componentWillUnmount() {
    this.props.dispatch(clearUserState());
  }

  render() {
    const { errors, message, inProgress, isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div className="form login-form">
        <h1>Login</h1>
        <br></br>
        {message && (
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        )}
        {errors.length > 0 &&
          errors.map((error) => (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ))}
        <div className="form-field">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
        </div>
        <div className="form-field">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          disabled={inProgress}
        >
          {inProgress && <CircularProgress color="secondary" />}
          {!inProgress && <p>Sign In</p>}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
