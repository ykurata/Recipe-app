import React, { Component } from 'react';
import Navbar from "./Navbar";

class Landing extends Component {

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div id="landing">
          <div id="image" className="col-lg-6 p-0">
          </div>
          <div className="col-lg-6 p-0">
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;