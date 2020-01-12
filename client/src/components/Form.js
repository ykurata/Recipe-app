import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Navbar from "./Navbar";


const FormStyles = theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validationErrors: [],
      error: "",
    };
  }

  // Update user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };

    axios.post("/users/login", user)
      .then(res => {
        const { token } = res.data;
      })
      .catch(err => {
        this.setState({
          validationErrors: err.response.data,
          error: err.response.data
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Navbar></Navbar>

          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create a Recipe
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              {this.state.error ? 
                <Typography color="secondary">{this.state.error.error}</Typography>
                : null
              } 
              <Typography className={classes.label}>Recipe Title</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="title"
                placeholder="Title"
                onChange={this.onChange}
              />
              {this.state.validationErrors ? 
                <Typography color="secondary">{this.state.validationErrors.email}</Typography>
                : null
              } 
              <Typography className={classes.label}>Ingredients</Typography>
              <TextField
                id="outlined-multiline-static"
                margin="normal"
                multiline
                rows="5"
                id="ingredients"
                fullWidth
                name="ingredients"
                placeholder="Ingredients"
                variant="outlined"
              />
              {this.state.validationErrors ? 
                <Typography color="secondary">{this.state.validationErrors.password}</Typography>
                : null
              } 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(FormStyles)(Form);