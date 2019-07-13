import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.updateUsernameInput = this.updateUsernameInput.bind(this);
    this.updateEmailInput = this.updateEmailInput.bind(this);
    this.updatePasswordInput = this.updatePasswordInput.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      usernameInput: '',
      emailInput: '',
      passwordInput: '',
      error: '',
      isLoading: false
    }
  }

  updateUsernameInput(e) {
    this.setState({
      usernameInput: e.target.value
    })
  }

  updateEmailInput(e) {
    this.setState({
      emailInput: e.target.value
    })
  }

  updatePasswordInput(e) {
    this.setState({
      passwordInput: e.target.value
    })
  }

  async signup(e) {
    e.preventDefault();

    try {
      this.setState({isLoading: true});

      const user = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/create`,
        {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value
        }
      );

      localStorage.setItem('userId', user.data._id);
      this.props.updateUserId(user.data._id);
      this.props.toggleAuth();
    } 
    catch (error) {
      this.setState({error: 'user not found'});
      console.error(error);
    }

    this.setState({isLoading: false});
  }

  render() {

    return (
      <div className="signup-screen">
        <h1>Signup</h1>
        <p>Enter your Email and password to sign up to infocus.</p>
        <form onSubmit={this.signup}>
          <input 
            name="username" 
            type="text" 
            placeholder="username"
            autoComplete="off"
            spellCheck="false"
            onChange={this.updateUsernameInput}
            value={this.state.usernameInput}
          >
          </input>
          <input 
            name="email" 
            type="text" 
            placeholder="email"
            autoComplete="off"
            spellCheck="false"
            onChange={this.updateEmailInput}
            value={this.state.emailInput}
          >
          </input>
          <input 
            name="password" 
            type="password" 
            placeholder="password"
            autoComplete="off"
            spellCheck="false"
            onChange={this.updatePasswordInput}
            value={this.state.passwordInput}
          >
          </input>
          {
            this.state.isLoading 
            ?
            <div className="loading-spinner"></div>
            :
            <button disabled={
                !this.state.usernameInput ||
                !this.state.emailInput ||
                !this.state.passwordInput
              }
            >
              Sign Up
            </button>
          }
        </form>
        {
          this.state.error &&
          <p className="error">
            {this.state.error}
          </p> 
        }
        <p className="toggle-form">
          Already have an account?
          <span onClick={this.props.toggleSignupForm}> Log In</span>
        </p>
      </div>
    );
  }
};