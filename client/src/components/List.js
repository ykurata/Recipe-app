import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import ColorNavbar from "./ColorNavbar";

const ListStyles = theme => ({
  card: {
    maxWidth: 350,
    minWidth: 350,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15
  },
  media: {
    height: 250,
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

          <Grid item >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea> 
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Omurice
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Easy to make!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea> 
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Omurice
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Easy to make!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea> 
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Omurice
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Easy to make!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </div>
    );
  }
}

export default withStyles(ListStyles)(List);