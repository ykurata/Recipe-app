import React, { Component } from 'react';
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";


const ProfileDetailStyle = theme => ({
  avatar: {
    width: 250,
    height: 250
  }
});

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      empty: false,
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId")
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    axios.get(`/profile/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        if (res.data) {
          this.setState({ 
            profile: res.data,
          });
          console.log(this.state.profile);
        } else {
          this.setState({ empty: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    );
  }
}

export default withStyles(ProfileDetailStyle)(ProfileDetail);