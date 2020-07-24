import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      estimatedTime: "",
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

    if (this.state.sendImage === null) {
      this.setState({
        error: "Please select Image"
      });
    }

    const { name, estimatedTime, ingredients, steps, sendImage, formData } = this.state;
    
    formData.append("name", name);
    formData.append("estimatedTime", estimatedTime);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("recipeImage", sendImage);

    axios.post("/recipes", formData, { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        toast.success("Created a recipe!" , {
          position: "top-right",
          autoClose: 2000
        }); 
        window.location = `/image/${res.data.id}`;
      })
      .catch(err => {
        this.setState({
          validationErrors: err.response.data
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div id="form">
          <div className="main container">
            <div className="col-12 text-center">
              <h2 className="heading">Create Recipe</h2>
            </div>
            
              <form className="text-center" onSubmit={this.onSubmit}>
                {/* recipe title */}
                {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.name}</p>
                : null}
                <input onChange={this.onChange} type="text" name="name" id="name" className="form-control mb-4" placeholder="Recipe Title" />
                {/* estimated time */}
                {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.estimatedTime}</p>
                : null}
                <div className="time">
                  <div className="time-input">
                    <input onChange={this.onChange} className="form-control" name="estimatedTime" id="estimatedTime" type="number" placeholder="Estimated Time" /> 
                  </div>
                  <div className="time-label">min</div>
                </div>
                {/* ingredients */}
                {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.ingredients}</p>
                : null}
                <textarea onChange={this.onChange} className="form-control mb-4" name="ingredients" id="ingredients" rows="5" placeholder="Ingredients..."></textarea>
                {/* steps */}
                {this.state.validationErrors ? 
                  <p className="error">{this.state.validationErrors.steps}</p>
                : null}
                <textarea onChange={this.onChange} className="form-control mb-4" name="steps" id="steps" rows="7" placeholder="Steps..."></textarea>
                <ToastContainer />
                <button className="btn btn-info btn-block my-4" type="submit">Create</button>
                <a href="/"><p>Cancel</p></a>
              </form>
          </div>
        </div>  
      </div>    
    );
  }
}

export default Form;