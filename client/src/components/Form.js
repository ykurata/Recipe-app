import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ColorNavbar from "./ColorNavbar";


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
  square: {
    marginTop: "50px",
    width: 400,
    height: 300,
    marginBottom: "30px"
  }
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
          <ColorNavbar></ColorNavbar>
          <Grid container>
            <Grid item xs={6}>
              <Container component="main" maxWidth="sm">
              <CssBaseline />
              <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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
                  <Typography className={classes.label}>Steps</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    margin="normal"
                    multiline
                    rows="5"
                    id="steps"
                    fullWidth
                    name="steps"
                    placeholder="Steps"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </Container>
          </Grid> 
          <Grid item xs={6} >
            <div className={classes.paper}>
              <Avatar variant="square" className={classes.square}>
                No Image
              </Avatar>
              <Button
                variant="contained"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
            </div>  
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(FormStyles)(Form);