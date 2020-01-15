import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import ColorNavbar from "./ColorNavbar";
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
  }
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes : [],
      token: localStorage.getItem("jwtToken"),
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    axios.get('/recipes/list', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          recipes: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    let recipes;
    if (this.state.recipes.length > 0) {
      recipes = this.state.recipes.map((item, i) => (
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
                  to={`/recipe/${item._id}`} 
                />
              : <Avatar 
                  variant="square" 
                  className={classes.avatar}
                  component={Link}
                  to={`/recipe/${item._id}`} 
                >No Image</Avatar>
              }
            </CardActionArea>     
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography noWrap variant="body2" color="textSecondary" component="p">
                {item.ingredients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ));
    } else {
      recipes = <Grid containeralign="center" style={{ marginTop: 50 }}>
                  <Typography variant="h4">No Recipes</Typography>
                </Grid>
    }

    return (
      <div>
        <ColorNavbar></ColorNavbar>

        <Grid container justify="center">
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
              name="location"
              placeholder="Search Recipe"
              margin="normal"
              variant="outlined"
              value=""
            />  
          </Grid>
          {recipes}
        </Grid>
    </div>
    );
  }
}

export default withStyles(ListStyles)(List);