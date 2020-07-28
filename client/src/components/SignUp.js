import React from "react";
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBBtn, 
  MDBCard, 
  MDBCardBody 
} from 'mdbreact';

const SignUp = () => {
  return (
    <MDBContainer className="login-form">
      <MDBRow>
        <MDBCol>
          <MDBCard className="login-card">
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign Up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                  <MDBInput
                    label="Confirm Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Sign Up
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;