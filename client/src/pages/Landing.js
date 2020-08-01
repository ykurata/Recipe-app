import React from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Navbar from "../components/Navbar";

import image from '../images/salad.jpg';

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <MDBView src={image}>
        <MDBMask className="flex-center flex-column text-center">
          <h1 className="landing-text">My Recipes</h1>
          <h3>Search and Save Your Recipes</h3>
        </MDBMask>
      </MDBView>
    </div>
  );
}

export default Landing;