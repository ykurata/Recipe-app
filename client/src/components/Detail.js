import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const DetailStyles = theme => ({
  square: {
    marginTop: "60px",
    width: 400,
    height: 300,
    marginBottom: "30px"
  },
  card: {
    marginTop: 10,
    maxheight: 200,
    overflow: 'auto'
  },
  steps: {
    marginTop: 10,
    maxHeight: 400,
    overflow: 'auto'
  }
});


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      token: localStorage.getItem("jwtToken")
    };
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      this.setState({
        recipe: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    const { classes } = this.props;
    const { recipe } = this.state;

    return (
      <div>
        <Grid container justify="center" style={{ marginTop: 100 }}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">{recipe.name}</Typography>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={4}>
            {recipe.recipeImage ?
              <Avatar variant="square" className={classes.square} src={recipe.recipeImage} />
            : <Avatar variant="square" className={classes.square}>No Image</Avatar>
            }
          </Grid>
          <Grid item xs={4} style={{ marginTop: 50 }} align="center">
            <Typography variant="h5">Ingredients</Typography>
            <Card className={classes.card} variant="outlined" align="left">
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {recipe.ingredients}
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="h5" style={{ marginTop: 10 }}>Steps</Typography>
            <Card className={classes.steps} variant="outlined" align="left">
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {recipe.steps}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </div>
    );
  };
}

export default withStyles(DetailStyles)(Detail);