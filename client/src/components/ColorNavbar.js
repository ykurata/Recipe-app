import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import '../App.css';

const ColorNavbarStyles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white"
  },
  button: { 
    color: "white"
  }
});

class ColorNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name")
    };
  }
  
  render() {
    const { classes } = this.props;

    let buttons;
    if (this.state.name) {
      buttons = <AppBar position="static"  className="colorNav">
                  <Toolbar>
                    <IconButton component={Link} to="/" edge="start" className={classes.menuButton}  aria-label="menu">
                      <RestaurantIcon />
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6"  className={classes.title}>
                      Recipes
                    </Typography>
                    <Typography variant="button" >Welocome, {this.state.name}</Typography>
                    <Button  className={classes.button} component={Link}  to="/login">Create Recipe</Button>
                  </Toolbar>
                </AppBar>

    } else {
      buttons = <AppBar position="static" className="colorNav">
                  <Toolbar>
                    <IconButton component={Link} to="/" edge="start" className={classes.menuButton} aria-label="menu">
                      <RestaurantIcon />
                    </IconButton>
                    <Typography component={Link} to="/"  variant="h6" className={classes.title}>
                      Recipes
                    </Typography>
                    <Button className={classes.button} component={Link}  to="/list">Search</Button>
                    <Button className={classes.button} component={Link}  to="/create">Create Recipe</Button>
                    <Button className={classes.button} component={Link}  to="/login">Login</Button>
                    <Button className={classes.button} component={Link}  to="/signup" >Sign Up</Button>
                  </Toolbar>
                </AppBar>
    }

    return (
      <div className="appbar">
        {buttons}
      </div>
    );
  }
}

export default withStyles(ColorNavbarStyles)(ColorNavbar);