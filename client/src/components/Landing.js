import React from 'react';
import landing from '../images/recipe-app-landing.jpg';
import landing2 from '../images/recipe-app-landing2.jpg';


const landingStyles = {
  backgroundImage : `url(${landing2})` ,
  width: "50%",
  position: "absolute",
  left: "0px",
  backgroundSize: 'cover',
  height: '100vh',
}

export default function Landing() {
  return (
    <div style={landingStyles}>

    </div>
  );
}