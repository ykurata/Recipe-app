import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";


const ProfileFormStyle = theme => ({
  avatar: {
    width: 250,
    height: 250
    
  }
});

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div> 
        <Navbar></Navbar>
        <div id="form">
          <div className="main container-fluid">
            <div className="col-12 text-center">
              <h2 className="heading">Edit Profile</h2>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <Grid container justify="center">  
                  <Avatar className={classes.avatar}></Avatar>
                </Grid>
                <div className="text-center">
                  <label className="btn btn-info">
                    Select Image
                    <input
                      type="file"
                      name="image"
                      hidden
                    />
                  </label>
                </div>
                <div className="text-center">
                  <button className="btn btn-info">Submit</button>
                </div> 
              </div>
              <div className="col-md-12 col-lg-6">
                <form className="text-center border border-light">
                  <textarea  className="form-control mb-4" name="ingredients" id="ingredients" rows="5" placeholder="Write about yourself..."></textarea>
                  <ToastContainer />
                  <button className="btn btn-info btn-block my-4" type="submit">Submit</button>
                  <a href="/"><p>Cancel</p></a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(ProfileFormStyle)(ProfileForm);