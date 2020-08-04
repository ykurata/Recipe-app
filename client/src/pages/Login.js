import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { useHistory } from "react-router-dom";

import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBBtn, 
  MDBCard, 
  MDBCardBody 
} from 'mdbreact';

const Login = (props) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const history = useHistory();

  console.log(auth)

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/list");
    }
  });
  
  const onChange = e => {
    setUserInput({ 
      ...userInput,
      [e.target.name]: e.target.value 
    });
  }
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(userInput));
  };

  const demoLogin = e => {
    e.preventDefault();
    const demoUser = {
      email: "yasuko@gmail.com",
      password: "testpassword"
    };
    dispatch(loginUser(demoUser));
  }

  return (
    <MDBContainer className="login-form">
      <MDBRow>
        <MDBCol>
          <MDBCard className="login-card">
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <p className="h4 text-center py-4">Log In</p>
                <div className="grey-text">
                  {errors?
                    <p className="error">{errors.email}</p>
                  : null  
                  }
                  {errors?
                    <p className="error">{errors.error}</p>
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
                  {errors ?
                    <p className="error">{errors.password}</p>
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
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn  type="submit">
                    Log In
                  </MDBBtn>
                  <MDBBtn outline onClick={demoLogin}>
                    Demo User
                  </MDBBtn>
                </div>
                <p className="text-center">
                  Don't have an account?
                  <a href="/signup">Register</a>
                </p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;