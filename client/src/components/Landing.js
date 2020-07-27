import React from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Navbar from "./Navbar";

import image from '../images/salad.jpg';

const myStyle = {
  backgroundImage : `url(${image})` ,
  backgroundSize: 'cover',
  height: '100vh',
  position: 'relative',
  width: '100%',
  display: 'table',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center right',
  backgroundAttachment: 'fixed'
}

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <MDBView src={image}>
        <MDBMask className="flex-center flex-column text-center">
          <h1>My Recipes</h1>
          <h3>Search and Save Your Recipes</h3>
        </MDBMask>
      </MDBView>
    </div>
  );
}

export default Landing;