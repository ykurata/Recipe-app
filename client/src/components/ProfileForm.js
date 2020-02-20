import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="sidebar">
          <a className="active" href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        
        <div className="content">
          <div className="login-form">
            <form className="text-center border border-light pt-5" onSubmit={this.onSubmit}>
                <p className="h4 mb-4">Profile</p>
                
                <textarea type="text" name="description" id="description" className="form-control mb-4" placeholder="About yourself..." rows="3" />
                <button className="btn btn-info btn-block my-4" type="submit">Log In</button>

            </form>
          </div>   
        </div>
      </div>
    );
  }
}

export default ProfileForm;