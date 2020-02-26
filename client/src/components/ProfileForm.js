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
      image: null,
      sendImage: null,
      profile: {},
      description: "",
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      validationError: [],
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  imageChange = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      sendImage: e.target.files[0]
    });
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    axios.get(`/profile/${this.state.userId}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({ 
          profile: res.data,
          description: res.data.description
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      description: this.state.description
    }
    
    if (this.state.profile) {
      axios.put(`/profile/update/${this.state.userId}`, data, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Submitted!" , {
          position: "top-right",
          autoClose: 10000
        });
      })
      .catch(err => {
        this.setState({
          validationError: err.response.data
        });
        console.log(err.response);
      });
    } else {
      axios.post("/profile", data, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Submitted!" , {
          position: "top-right",
          autoClose: 10000
        });
      })
      .catch(err => {
        this.setState({
          validationError: err.response.data
        });
        console.log(err.response);
      });
    }
  }

  render() {
    
    const { classes } = this.props;
    return (
      <div> 
        <Navbar></Navbar>
        <div id="profile-form">
          <div className="main container-fluid">
            <div className="col-12 text-center">
              <h2 className="heading">Edit Profile</h2>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <Grid container justify="center">  
                  <Avatar className={classes.avatar} src={this.state.image}></Avatar>
                </Grid>
                <div className="text-center select">
                  <label className="btn btn-outline-info select">
                    Select Image
                    <input
                      type="file"
                      name="image"
                      hidden
                      onChange={this.imageChange}
                    />
                  </label>
                </div>
                <div className="text-center select">
                  <button className="btn btn-info">Set the Image</button>
                </div> 
              </div>
              <div className="col-md-12 col-lg-6">
                <form className="text-center border border-light" onSubmit={this.handleSubmit}>
                  {this.state.validationError ? 
                    <p className="error">{this.state.validationError.description}</p>
                  : null}
                  <textarea onChange={this.onChange}  value={this.state.description} className="form-control mb-4" name="description" id="description" rows="5" placeholder="Write about yourself..."></textarea>
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