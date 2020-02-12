import React, { Component } from 'react';
import axios from 'axios';

import Navbar from "./Navbar";


class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      name: "",
      ingredients: "",
      steps: "",
      image: null,
      sendImage: null,
      formData: {},
      token: localStorage.getItem("jwtToken"),
      validationErrors: [],
      error: ""
    };
  }

  componentDidMount() {
    this.setState({ formData: new FormData() });
    this.getRecipe();
  }
   
  getRecipe() {
    axios.get(`/recipes/get/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      this.setState({
        recipe: res.data,
        name: res.data.name,
        ingredients: res.data.ingredients,
        steps: res.data.steps,
        image: res.data.recipeImage
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

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

    if (this.state.sendImage === null) {
      this.setState({
        error: "Please select Image"
      });
    }

    const { name, ingredients, steps, sendImage } = this.state;
    const updatedRecipe = {
      name: name,
      ingredients: ingredients,
      steps: steps
    }

    axios.put(`/recipes/update/${this.state.recipe._id}`, updatedRecipe, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        this.setState({
          validationErrors: err.response.data
        })
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div id="update">
          <div className="updateMain container-fluid">
            <div className="col-12 text-center">
              <h2 className="heading">Edit Recipe</h2>
            </div>
            <div className="col-12 text-center">
              <form className="update text-center border border-light" onSubmit={this.onSubmit}>
                  {this.state.validationErrors ? 
                    <p className="error">{this.state.validationErrors.name}</p>
                  : null}
                  <input onChange={this.onChange} value={this.state.name} type="text" name="name" id="name" className="form-control mb-4" placeholder="Recipe Title" />
                  {this.state.validationErrors ? 
                    <p className="error">{this.state.validationErrors.ingredients}</p>
                  : null}
                  <textarea onChange={this.onChange} value={this.state.ingredients} className="form-control mb-4" name="ingredients" id="ingredients" rows="5" placeholder="Ingredients..."></textarea>
                  {this.state.validationErrors ? 
                    <p className="error">{this.state.validationErrors.steps}</p>
                  : null}
                  <textarea onChange={this.onChange} value={this.state.steps} className="form-control mb-4" name="steps" id="steps" rows="7" placeholder="Steps..."></textarea>
                  <button className="btn btn-info btn-block my-4" type="submit">Edit</button>
                <a href={`/${this.state.recipe._id}`}><p>Cancel</p></a>
              </form>
            </div>
          </div>
        </div>
      </div>    
    );
  }
}

export default Update;