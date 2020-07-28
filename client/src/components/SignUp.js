import React, { useState } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBBtn, 
  MDBCard, 
  MDBCardBody 
} from 'mdbreact';

const SignUp = (props) => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [validationError, setValidationError] = useState([]);
  const [error, setError] = useState("");

  const onChange = e => {
    setUserInput({ 
      ...userInput,
      [e.target.name]: e.target.value 
    });
  }
  
  const onSubmit = e => {
    e.preventDefault();

    axios.post("/users/register", userInput)
      .then(res => {
        localStorage.setItem("jwtToken", res.data.token);
        const decoded = jwt_decode(res.data.token);
        localStorage.setItem("userId", decoded.id);
        props.history.push("/list");
      })
      .catch(err => {
        setValidationError(err.response.data);
        setError(err.response.data.error);
      });
  };

  return (
    <MDBContainer className="login-form">
      <MDBRow>
        <MDBCol>
          <MDBCard className="login-card">
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <p className="h4 text-center py-4">Sign Up</p>
                <div className="grey-text">
                  {validationError ?
                    <p className="error">{validationError.name}</p>
                  : null  
                  }
                  {error ?
                    <p className="error">{error}</p>
                  : null  
                  }
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="username"
                    value={userInput.username}
                    onChange={onChange}
                  />
                  {validationError ?
                    <p className="error">{validationError.email}</p>
                  : null  
                  }
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name="email"
                    value={userInput.email}
                    onChange={onChange}
                  />
                  {validationError ?
                    <p className="error">{validationError.password}</p>
                  : null  
                  }
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name="password"
                    value={userInput.password}
                    onChange={onChange}
                  />
                  {validationError ?
                    <p className="error">{validationError.password2}</p>
                  : null  
                  }
                  <MDBInput
                    label="Confirm Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name="password2"
                    value={userInput.password2}
                    onChange={onChange}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Sign Up
                  </MDBBtn>
                </div>
                <p className="text-center">
                  Already have an account?
                  <a href="/login">Log In</a>
                </p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;