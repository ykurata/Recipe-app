import React, { Component } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      validationErrors: [],
      error: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };

    axios.post("/users/register", newUser)
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
          error: err.response.data
        });
      });
  }

  render() {
   
    return (
      <div>
        <Navbar></Navbar>
        <div className="login-form">
          <form className="text-center border border-light pt-5" onSubmit={this.onSubmit}>
            <p className="h4 mb-4">Sign Up</p>
            <input onChange={this.onChange} type="text" id="defaultRegisterFormName" className="form-control mb-4" placeholder="Name"></input>
            <input onChange={this.onChange} type="email" name="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />
            <input onChange={this.onChange} type="password" name="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />
            <input onChange={this.onChange} type="password" name="confirmPassword" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Confirm Password" />
            <button className="btn btn-info btn-block my-4" type="submit">Sign Up</button>
            <p>Already a member?
                <a href="/login">Log In</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;

