import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ColorNavbar from "./ColorNavbar";


const FormStyles = theme => ({
  label: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  square: {
    marginTop: "50px",
    width: 400,
    height: 300,
    marginBottom: "30px",
    marginLeft: "50px"
  },
  formGrid: {
    marginLeft: 100
  },
  imageGrid: {
    marginLeft: 50
  }
});


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: "",
      steps: "",
      image: null,
      sendImage: null,
      token: localStorage.getItem("jwtToken")
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  imageChange = e => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      sendImage: e.target.files[0]
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, ingredients, steps, sendImage } = this.state;
    const image = this.state.sendImage;
    let formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    // formData.append("file", this.state.sendImage);
    // console.log(formData);

    // const recipe = {
    //   name: name,
    //   ingredients: ingredients,
    //   steps: steps,
    //   recipeImage: formData
    // };

    // axios.post("/recipes", formData, recipe, { headers: { Authorization: `Bearer ${this.state.token}` }})
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.sendImage);
    return (
        <div>
          <ColorNavbar></ColorNavbar>
          <Grid container>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <Grid container justify="center">
                <Grid item xs={5} >
                  <Typography className={classes.label}>Recipe Title</Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="Title"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                  <Typography className={classes.label}>Ingredients</Typography>
                  <TextField
                    id="ingredients"
                    margin="normal"
                    multiline
                    rows="5"
                    fullWidth
                    name="ingredients"
                    placeholder="Ingredients"
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.ingredients}
                  />
                  <Typography className={classes.label}>Steps</Typography>
                  <TextField
                    id="steps"
                    margin="normal"
                    multiline
                    rows="8"
                    fullWidth
                    name="steps"
                    placeholder="Steps"
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.steps}
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
                </Grid>

                {/* Image upload */}
                <Grid item xs={4} >
                  <Avatar variant="square" 
                    className={classes.square}
                    src={this.state.image}
                  >
                    No Image
                  </Avatar> 
                  <Button
                    variant="contained"
                    component="label"
                    style={{ marginLeft: 180 }}
                  >
                    Upload Image
                    <input
                      type="file"
                      name="image"
                      onChange={this.imageChange}
                      style={{ display: "none" }}
                    />
                  </Button>  
                </Grid>
              </Grid>
            </form>
          </Grid>
      </div>
    );
  }
}

export default withStyles(FormStyles)(Form);