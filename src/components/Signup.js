import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './styles.css';
import { clearUserState, signup } from '../actions/user';
import Alert from '@material-ui/lab/Alert';
import { Button, CircularProgress, TextField } from '@material-ui/core';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, username, password, confirm_password } = this.state;
    this.props.dispatch(
      signup(name, email, username, password, confirm_password)
    );
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
      <div className="form signup-form">
        <h1>Signup</h1>
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
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(event) => this.setState({ name: event.target.value })}
          />
        </div>
        <div className="form-field">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </div>
        <div className="form-field">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
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
            type="password"
            id="password"
            label="Password"
            name="password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
        </div>
        <div className="form-field">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            onChange={(event) =>
              this.setState({ confirm_password: event.target.value })
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
          {!inProgress && <p>Sign Up</p>}
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

export default connect(mapStateToProps)(Signup);
