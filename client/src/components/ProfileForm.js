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
      empty: false,
      description: "",
      formData: {},
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      validationError: [],
      error: ""
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
    this.setState({ formData: new FormData() });
  }

  getProfile() {
    axios.get(`/profile/${this.state.userId}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        if (res.data) {
          this.setState({ 
            profile: res.data,
            description: res.data.description,
            image: res.data.photo
          });
        } else {
          this.setState({ empty: true });
        }
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
    
    if (this.state.empty === true) {
      axios.post(`/profile/${this.state.userId}`, data, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Created!" , {
          position: "top-right",
          autoClose: 3000
        });
      })
      .catch(err => {
        this.setState({
          validationError: err.response.data
        });
        console.log(err.response.data);
      });
    } else {
      axios.put(`/profile/update/${this.state.userId}`, data, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Updated!" , {
          position: "top-right",
          autoClose: 3000
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

  submitPhoto = e => {
    e.preventDefault();

    if (this.state.sendImage === null) {
      this.setState({
        error: "Please select Image"
      });
    }
    const { sendImage, formData } = this.state;
    formData.append("photo", sendImage);
  
    axios.post("/profile/photo", formData, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      toast.success("Successfully Sent a Photo!" , {
        position: "top-right",
        autoClose: 3000
      }); 
    })
    .catch(err => {
      console.log(err.response.data);
      toast.error("Something went wrong!" , {
        position: "top-right",
        autoClose: 3000
      }); 
    });
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
                <form onSubmit={this.submitPhoto}>
                  <Grid container justify="center">  
                    <Avatar className={classes.avatar} src={this.state.image}></Avatar>
                  </Grid>
                  <div className="text-center select">
                    {this.state.error ? 
                      <div><label className="error">{this.state.error}</label></div>
                    : null}
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
                  <ToastContainer />
                  <div className="text-center select">
                    <button className="btn btn-info" type="submit">Send the Image</button>
                  </div> 
                </form>
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