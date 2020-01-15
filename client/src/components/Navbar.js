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

const NavbarStyles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
});

class Navbar extends Component {
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
      buttons = <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
                  <Toolbar>
                    <IconButton component={Link} to="/" edge="start" className={classes.menuButton} color="default" aria-label="menu">
                      <RestaurantIcon />
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6" color="textPrimary" className={classes.title}>
                      Recipes
                    </Typography>
                    {/* <Typography variant="button" color="textPrimary">Welocome, {this.state.name}</Typography> */}
                    <Button color="default" component={Link}  to="/list">Search</Button>
                    <Button color="default" component={Link}  to="/create">Create Recipe</Button>
                    <Button color="default" component={Link}  to="/logout">Log Out</Button>
                  </Toolbar>
                </AppBar>

    } else {
      buttons = <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
                  <Toolbar>
                    <IconButton component={Link} to="/" edge="start" className={classes.menuButton} color="default" aria-label="menu">
                      <RestaurantIcon />
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6" color="textPrimary" className={classes.title}>
                      My Recipes
                    </Typography>
                    <Button color="default" component={Link}  to="/list">Search</Button>
                    <Button color="default" component={Link}  to="/create">Create Recipe</Button>
                    <Button color="default" component={Link}  to="/login">Login</Button>
                    <Button color="default" component={Link} to="/signup" >Sign Up</Button>
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

export default withStyles(NavbarStyles)(Navbar);