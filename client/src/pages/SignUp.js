import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../actions/authActions';

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
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const onChange = e => {
    setUserInput({ 
      ...userInput,
      [e.target.name]: e.target.value 
    });
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/list");
    }
  });
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(userInput));
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
                  {errors ?
                    <p className="error">{errors.name}</p>
                  : null  
                  }
                  {errors ?
                    <p className="error">{errors.error}</p>
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
                    name="name"
                    value={userInput.name}
                    onChange={onChange}
                  />
                  {errors ?
                    <p className="error">{errors.email}</p>
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
                  {errors ?
                    <p className="error">{errors.password2}</p>
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
                  <MDBBtn type="submit">
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