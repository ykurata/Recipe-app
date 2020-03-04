import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Moment from 'react-moment';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";


const ProfileDetailStyle = theme => ({
  bigAvatar: {
    width: 250,
    height: 250
  },
  container: {
    marginTop: 50
  },
  card: {
    maxWidth: 350,
    minWidth: 350,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15
  },
  media: {
    height: 300,
  },
  avatar: {
    height: 300,
    width: 350,
    textDecoration: "none",
  },
  content: {
    textDecoration: "none"
  },
  userName: {
    fontSize: 12
  },
  bottom: {
    marginBottom: 50
  }
});

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      recipes: [],
      name: "",
      image: null,
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId")
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getRecipes();
  }

  getProfile() {
    axios.get(`/profile/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        if (res.data) {
          this.setState({ 
            profile: res.data,
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

  getRecipes() {
    axios.get(`/recipes/userid/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({ 
          recipes: res.data,
          name: res.data[0].userId.name
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    const { classes } = this.props;
    const { recipes } = this.state;

    let userRecipes;

    userRecipes = recipes.map((item, i) => (
      <Grid item key={i} >
        <Card className={classes.card} >
          <CardActionArea>
            {item.recipeImage ?
              <CardMedia
                id={item._id}
                title="recipe image"
                className={classes.media}
                image={`http://localhost:5000/${item.recipeImage}`}
                component={Link}
                to={`/${item._id}`}
              />
            : <Avatar 
                variant="square" 
                className={classes.avatar}
                component={Link}
                to={`/${item._id}`}
              >No Image</Avatar>
            }
          </CardActionArea>     
          <CardContent>
            <Typography  variant="h5" component="h2">
              {item.name} 
            </Typography>
            <Typography gutterBottom className={classes.userName} variant="body1" color="textSecondary">
              Created by {item.userId.name}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary" >
              Ingredients: {item.ingredients} 
            </Typography>         
          </CardContent>
        </Card>
      </Grid>
    ));
  
    return (
      <div>
        <Navbar></Navbar>

        <div id="profile-detail" className="top container-fluid">
          <div className="inner-div">
            <div className="col-12 text-center">
              <h2 className="name">{this.state.name}</h2>
              <p>Joined <Moment format="MMMM YYYY">{this.state.profile.createdAt}</Moment></p>
              <Grid container className={classes.container} justify="center">  
                <Avatar className={classes.bigAvatar} src={`http://localhost:5000/${this.state.image}`}></Avatar>
              </Grid>
              
              {/* display description only if it's saved */}
              {this.state.profile.description ?
                <Grid container className={classes.container} justify="center"> 
                  <div className="card">
                    <div className="card-body text-left">
                      {this.state.profile.description}
                    </div>
                  </div>
                </Grid> 
              : null   
              }
      
            </div> 
          </div>   

          <Grid className={classes.bottom} container justify="center">
            <div className="col-12 text-center">
              <h4 className="title">{this.state.name}'s Recipes</h4>
            </div>  
            {userRecipes}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(ProfileDetailStyle)(ProfileDetail);