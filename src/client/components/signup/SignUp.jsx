import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  };

  onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, email: 'Email is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, email: 'Email is invalid' } });
    } else {
      this.setState({ 
        email: val, 
        error: { ...this.state.error, email: '' }
      });
    }
  };

  onFirstnameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]{2,}/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, firstname: 'First name is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, firstname: 'First name must be at least 2 letters' } });
    } else {
      this.setState({ 
        firstname: val, 
        error: { ...this.state.error, firstname: '' }
      });
    }
  };

  onLastNameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]/g;

    if (val === '') {
      this.setState({ error: { ...this.state.error, lastname: 'Last name is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, lastname: 'Last name should only contain letters' } });
    } else {
      this.setState({ 
        lastname: val, 
        error: { ...this.state.error, lastname: '' }
      });
    }
  };

  onPasswordInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[A-Z\W]/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, password: 'Password name is required' } });
    } else if (val.length < 8) {
      this.setState({ error: { ...this.state.error, password: 'Password should be 8 characters long' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, password: 'Password should contain uppercase or alphanumeric character' } });
    } else {
      this.setState({ 
        password: val, 
        error: { ...this.state.error, password: '' }
      });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
  }

  errorClassName = (field) => {
    return this.state.error[field] ? 'input-error' : '';
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={this.onFormSubmit}>
          {error.firstname && <p>{error.firstname}</p>}
          <input 
              className={this.errorClassName('firstname')}
              onKeyUp={this.onFirstnameInput}
              placeholder="First Name"
              type="text" 
          />
          <br/>
          {error.lastname && <p>{error.lastname}</p>}
          <input
              className={this.errorClassName('lastname')}
              onInput={this.onLastNameInput}
              placeholder="Last Name" 
              type="text"
          />
          <br/>
          {error.email && <p>{error.email}</p>}
          <input 
              className={this.errorClassName('email')}
              onInput={this.onEmailInput}
              placeholder="Email"
              type="email" 
          />
          <br/>
          {error.password && <p>{error.password}</p>}
          <input
              onInput={this.onPasswordInput}
              className={this.errorClassName('password')}
              placeholder="Password" 
              type="password"
          />
          <br/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
