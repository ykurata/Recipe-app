import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Navbar from "./Navbar";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      userid: "",
      username: "",
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
    };
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      this.setState({
        recipe: res.data,
        userid: res.data.userId._id,
        username:res.data.userId.name
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    const { recipe } = this.state;
    return (
      <div>
       <Navbar></Navbar>

       <div id="detail" className="main container-fluid padding">
        <div className="inner-div">
          <div className="col-12 text-center">
            <h2 className="heading">{recipe.name}</h2>
            <p>Created by {this.state.username}</p>
          </div>
        
          <div className="row padding">
            <div className="col-md-12 col-lg-6">
              <div className="image text-center">
                <img src={recipe.recipeImage} className="img-thumbnail img-fluid" alt="No Image" />
              </div>
            </div>
            <div className="col-md-12 col-lg-6 text-center">
              <div className="content">
                <h5>Ingredients</h5>
                <div className="card">
                  <div className="card-body text-left">
                    {recipe.ingredients}
                  </div>
                </div>
              </div>
              <div className="content">
                <h5>Steps</h5>
                <div className="card">
                  <div className="card-body text-left">
                    {recipe.steps}
                  </div>
                </div>
              </div>
              {this.state.userId === this.state.userid ?
                <div className="button-div">
                  <a href={`/update/${recipe._id}`} type="button" className="btn btn-info">Update</a>
                  <button type="button" className="btn btn-outline-info">Delete</button>
                </div>
              : null  
              }
            </div>
          </div>
        </div>
      </div>  
      </div>
    );
  };
}

export default Detail;