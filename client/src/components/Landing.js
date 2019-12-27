import React from 'react';
import '../App.css';
import landing from '../images/recipe-app-landing2.jpg';
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="Landing" style={{backgroundImage: `url(${landing})` }}></div>
    </div>
  );
};

export default Landing;