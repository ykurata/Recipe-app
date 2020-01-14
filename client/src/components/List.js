import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import ColorNavbar from "./ColorNavbar";

const ListStyles = theme => ({
  card: {
    maxWidth: 350,
    marginTop: 50,
    
  },
  media: {
    height: 200,
  },
  container: {
    backgroundColor: "grey"
  },
});

class List extends Component {


  render() {
    const { classes } = this.props;

    return (
      <div>
        <ColorNavbar></ColorNavbar>

        <Grid container justify="center">
          <Grid item xs={10} style={{ marginTop: 100 }} align="center">
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    </div>
    );
  }
}

export default withStyles(ListStyles)(List);