import React, { Component } from 'react';
import axios from 'axios';

import Navbar from "./Navbar";


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
    formData.append("file", this.state.sendImage);
    console.log(formData);

    const recipe = {
      name: name,
      ingredients: ingredients,
      steps: steps,
      recipeImage: formData
    };

    axios.post("/recipes", formData, recipe, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div id="form">
          <div className="main container-fluid">
            <div className="col-12 text-center">
              <h2 className="heading">Create Recipe</h2>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="text-center">
                  <img src={this.state.image} className="rounded" />
                  <input
                    type="file"
                    name="image"
                    onChange={this.imageChange}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <form className="text-center border border-light p-5 w-5" action="#!">
                    <input type="text" name="title" id="title" className="form-control mb-4" placeholder="Recipe Title" />
                    <textarea className="form-control mb-4" name="ingredients" id="ingredients" rows="5" placeholder="Ingredients..."></textarea>
                    <textarea className="form-control mb-4" name="steps" id="steps" rows="7" placeholder="Steps..."></textarea>
                    <button className="btn btn-info btn-block my-4" type="submit">Create</button>
                    <a href="/"><p>Cancel</p></a>
                </form>
              </div>
            </div>
          </div>
        </div>  
      </div>    
    );
  }
}

export default Form;