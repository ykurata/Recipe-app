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
      formData: {},
      token: localStorage.getItem("jwtToken")
    };
  }

  componentDidMount() {
    this.setState({ formData: new FormData() });
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
    const { name, ingredients, steps, sendImage, formData } = this.state;
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("recipeImage", sendImage);

    axios.post("/recipes", formData, { headers: { Authorization: `Bearer ${this.state.token}` }})
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
                <div className="image-center text-center">
                  <img src={this.state.image} className="img-thumbnail img-fluid" alt="" />
                  <input
                    type="file"
                    name="image"
                    onChange={this.imageChange}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <form className="text-center border border-light p-5 w-5" onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} type="text" name="name" id="name" className="form-control mb-4" placeholder="Recipe Title" />
                    <textarea onChange={this.onChange} className="form-control mb-4" name="ingredients" id="ingredients" rows="5" placeholder="Ingredients..."></textarea>
                    <textarea onChange={this.onChange} className="form-control mb-4" name="steps" id="steps" rows="7" placeholder="Steps..."></textarea>
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