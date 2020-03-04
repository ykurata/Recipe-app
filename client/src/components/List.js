import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import Navbar from "./Navbar";
import axios from 'axios';

const ListStyles = theme => ({
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
  container: {
    marginBottom: 50
  }
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes : [],
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      search: "",
      loading: false
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    axios.get('/recipes/list', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          recipes: res.data,
          loading: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    
    // Filter by search input 
    const filteredRecipes = this.state.recipes.filter(item => {
      const query = this.state.search.toLowerCase();
    
      return (
        item.name.toLowerCase().indexOf(query) >= 0 ||
        item.ingredients.toLowerCase().indexOf(query) >= 0 
      )
    });

    let recipes;
  
    recipes = filteredRecipes.map((item, i) => (
      <Grid item key={i} >
        <Card className={classes.card} >
          <CardActionArea>
            {item.recipeImage ?
              <CardMedia
                id={item._id}
                title="recipe image"
                className={classes.media}
                image={item.recipeImage}
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

        <Grid container className={classes.container} justify="center">
          <Grid item xs={12} style={{ marginTop: 100 }} align="center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                )
              }}
              id="outlined-bare"
              name="search"
              placeholder="Ingredients, dish, keywords..."
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              value={this.state.search}
            />  
          </Grid>
          {this.state.recipes.length === 0 && this.state.loading === true ?
            <Grid containeralign="center" style={{ marginTop: 50 }}>
              <Typography variant="h4">No Recipes</Typography>
            </Grid>
          : null  
          }

          {this.state.loading === false ? 
            <Grid containeralign="center" style={{ marginTop: 50 }}>
              <Typography variant="h4">Loading Recipes...</Typography>
            </Grid>
          : null
          }
          {recipes}
        </Grid>
    </div>
    );
  }
}

export default withStyles(ListStyles)(List);