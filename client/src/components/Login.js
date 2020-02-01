import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validationErrors: [],
      error: "",
    };
  }

  // Update user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };

    axios.post("/users/login", user)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("userId", decoded.id);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          validationErrors: err.response.data,
          error: err.response.data.error
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="login-form">
          <form className="text-center border border-light pt-5" onSubmit={this.onSubmit}>
              <p className="h4 mb-4">Log in</p>
              {this.state.error ? 
                <p className="error">{this.state.error}</p>
              : null}
              {this.state.validationErrors ? 
                <p className="error">{this.state.validationErrors.email}</p>
              : null}
              <input onChange={this.onChange} type="email" name="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />
              {this.state.validationErrors ? 
                <p className="error">{this.state.validationErrors.password}</p>
              : null}
              <input onChange={this.onChange} type="password" name="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />
              <button className="btn btn-info btn-block my-4" type="submit">Log In</button>
              <p>Not a member?
                  <a href="/signup">Register</a>
              </p>
          </form>
        </div>   
      </div>
    );
  }
}

export default Login;