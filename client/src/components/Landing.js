import React, { Component } from 'react';
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

class Landing extends Component {

  render() {
    return (
      <div style={{ height: '100%'}}>
        <Navbar />
        <div id="landing" style={myStyle}>
          <div className="landing-text">
            <h1>My Recipes</h1>
            <h3>Search and Save Your Recipes</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;