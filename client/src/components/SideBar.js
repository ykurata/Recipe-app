import React, { Component } from 'react';
import axios from 'axios';

class SideBar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <a className="active" href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        <div className="content">
    
        </div>
      </div>
    );
  }
}

export default SideBar;