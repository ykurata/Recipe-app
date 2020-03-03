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
  },
  container: {
    marginTop: 50
  }
});

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      name: "",
      image: null,
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
            name: res.data.userId.name,
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


  render() {
    const { classes } = this.props;
  
    return (
      <div>
        <Navbar></Navbar>

        <div id="profile-detail" className="main container-fluid">
          <div className="inner-div">
            <div className="col-12 text-center">
              <h2 className="heading">{this.state.name}</h2>
              <Grid container className={classes.container} justify="center">  
                <Avatar className={classes.avatar} src={`http://localhost:5000/${this.state.image}`}></Avatar>
              </Grid>
            </div> 
          </div>   
        </div>
      </div>
    );
  }
}

export default withStyles(ProfileDetailStyle)(ProfileDetail);