import React, { Component } from 'react';
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
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  } 
  
  render() {
    const { classes } = this.props;
    return (
      <div className="appbar">
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
              <RestaurantIcon />
            </IconButton>
            <Typography variant="h6" color="textPrimary" className={classes.title}>
              Recipes
            </Typography>
            <Button color="default">Login</Button>
            <Button color="default">Sign Up</Button>
          </Toolbar>
        </AppBar>
       </div>
    );
  }
}

export default withStyles(NavbarStyles)(Navbar);