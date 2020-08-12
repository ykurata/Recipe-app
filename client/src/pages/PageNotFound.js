import React from "react";

import Navbar from "../components/Navbar";

import { 
  MDBBtn,
  MDBContainer,
  MDBRow, 
  MDBCol,
  MDBIcon,
} from 'mdbreact';


const PageNotFound = () => {
  return (
    <div>
      <Navbar/>
      <MDBContainer className="page-not-found">
          <h4>Page not found</h4>
      </MDBContainer>
    </div>
  );
}

export default PageNotFound;